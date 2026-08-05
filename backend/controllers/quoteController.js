const mongoose = require('mongoose');
const Quote = require('../models/quoteModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { decrementVariantStock } = require('./productController');
const { getExpectedDeliveryDate } = require('./orderController');

const MIN_BULK_QUANTITY = Quote.MIN_BULK_QUANTITY;
const REQUIRED_ADDRESS_FIELDS = ['name', 'phone', 'line1', 'city', 'state', 'pincode'];

// Validates + prices each requested item against the live product/variant.
// Throws AppError on any mismatch — never trusts client-supplied name/price beyond the proposal itself.
const buildQuoteItems = async (requestedItems) => {
  const items = [];

  for (const requested of requestedItems) {
    const { productId, variantLabel, quantity, proposedPrice } = requested;

    if (!productId || !variantLabel || !quantity || proposedPrice === undefined) {
      throw new AppError('Each item requires productId, variantLabel, quantity, and proposedPrice', 400);
    }

    if (Number(quantity) < MIN_BULK_QUANTITY) {
      throw new AppError(`Quantity must be at least ${MIN_BULK_QUANTITY} units per item for a bulk quote`, 400);
    }

    const product = await Product.findById(productId);
    if (!product || !product.active) {
      throw new AppError(`Product not found: ${productId}`, 404);
    }

    const variant = product.variants.find((v) => v.label === variantLabel);
    if (!variant) {
      throw new AppError(`Variant "${variantLabel}" not found on product "${product.name}"`, 400);
    }

    if (Number(proposedPrice) <= 0 || Number(proposedPrice) > variant.price) {
      throw new AppError(
        `Proposed price for "${product.name}" (${variantLabel}) must be between 0 and its listed price of ${variant.price}`,
        400,
      );
    }

    const quantityNum = Number(quantity);
    const priceNum = Number(proposedPrice);

    items.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      variantLabel,
      quantity: quantityNum,
      proposedPrice: priceNum,
      subtotal: priceNum * quantityNum,
    });
  }

  return items;
};

// ── B2B member-facing ─────────────────────────────────────────────────────────

// POST /api/v1/b2b/quotes
exports.createQuote = catchAsync(async (req, res, next) => {
  const { items: requestedItems, buyerBusinessName, shippingAddress, notes } = req.body;

  if (!buyerBusinessName) {
    return next(new AppError('Please provide the buyer business name', 400));
  }

  if (!shippingAddress || REQUIRED_ADDRESS_FIELDS.some((field) => !shippingAddress[field])) {
    return next(new AppError(`Please provide a complete shipping address (${REQUIRED_ADDRESS_FIELDS.join(', ')})`, 400));
  }

  if (!Array.isArray(requestedItems) || !requestedItems.length) {
    return next(new AppError('A quote must include at least one item', 400));
  }

  const items = await buildQuoteItems(requestedItems);
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  const quote = await Quote.create({
    b2bMember: req.b2bMember._id,
    items,
    buyerBusinessName,
    shippingAddress,
    notes,
    totalAmount,
  });

  res.status(201).json({ status: 'success', data: { quote } });
});

// GET /api/v1/b2b/quotes
exports.getMyQuotes = catchAsync(async (req, res, next) => {
  const quotes = await Quote.find({ b2bMember: req.b2bMember._id }).sort('-createdAt');

  res.status(200).json({ status: 'success', results: quotes.length, data: { quotes } });
});

// GET /api/v1/b2b/quotes/:id
exports.getMyQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findOne({ _id: req.params.id, b2bMember: req.b2bMember._id });
  if (!quote) return next(new AppError('No quote found with that ID', 404));

  res.status(200).json({ status: 'success', data: { quote } });
});

// GET /api/v1/b2b/dashboard/stats
exports.getMyDashboardStats = catchAsync(async (req, res, next) => {
  const [quoteCounts, orderStats] = await Promise.all([
    Quote.aggregate([
      { $match: { b2bMember: req.b2bMember._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Order.aggregate([
      { $match: { b2bMember: req.b2bMember._id, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalSales: { $sum: '$totalAmount' } } },
    ]),
  ]);

  const countsByStatus = Object.fromEntries(quoteCounts.map((c) => [c._id, c.count]));

  res.status(200).json({
    status: 'success',
    data: {
      totalQuotes: quoteCounts.reduce((sum, c) => sum + c.count, 0),
      pendingQuotes: countsByStatus.Pending || 0,
      approvedQuotes: countsByStatus.Approved || 0,
      rejectedQuotes: countsByStatus.Rejected || 0,
      totalOrders: orderStats[0]?.totalOrders || 0,
      totalSales: orderStats[0]?.totalSales || 0,
    },
  });
});

// ── Admin-facing ───────────────────────────────────────────────────────────────

// GET /api/v1/admin/quotes
// Supports ?status=Pending&search=acme&dateFrom=2026-07-01&dateTo=2026-07-31
// `search` matches the requesting member's name/email/business name, the buyer
// business name on the quote, or any item's product name (case-insensitive).
exports.getAllQuotes = catchAsync(async (req, res, next) => {
  const { status, search, dateFrom, dateTo } = req.query;

  const filter = {};
  if (status) filter.status = status;

  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  let quotes = await Quote.find(filter).populate('b2bMember', 'name email businessName').sort('-createdAt');

  if (search) {
    const term = search.toLowerCase();
    quotes = quotes.filter(
      (quote) =>
        quote.b2bMember?.name?.toLowerCase().includes(term) ||
        quote.b2bMember?.email?.toLowerCase().includes(term) ||
        quote.b2bMember?.businessName?.toLowerCase().includes(term) ||
        quote.buyerBusinessName?.toLowerCase().includes(term) ||
        quote.items.some((item) => item.name.toLowerCase().includes(term)),
    );
  }

  res.status(200).json({ status: 'success', results: quotes.length, data: { quotes } });
});

// GET /api/v1/admin/quotes/:id
exports.getQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findById(req.params.id).populate('b2bMember', 'name email businessName');
  if (!quote) return next(new AppError('No quote found with that ID', 404));

  res.status(200).json({ status: 'success', data: { quote } });
});

// PATCH /api/v1/admin/quotes/:id/approve
// Admin may optionally send an `items` array to adjust quantity/proposedPrice before
// approving; otherwise the quote's original proposed items are used as-is.
exports.approveQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) return next(new AppError('No quote found with that ID', 404));

  if (quote.status !== 'Pending') {
    return next(new AppError(`This quote has already been ${quote.status.toLowerCase()}`, 400));
  }

  let finalItems = quote.items;
  if (Array.isArray(req.body.items) && req.body.items.length) {
    finalItems = await buildQuoteItems(
      req.body.items.map((item) => ({
        productId: item.product,
        variantLabel: item.variantLabel,
        quantity: item.quantity,
        proposedPrice: item.proposedPrice,
      })),
    );
  }

  const itemsTotal = finalItems.reduce((sum, item) => sum + item.subtotal, 0);
  const expectedDeliveryDate = await getExpectedDeliveryDate();

  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      for (const item of finalItems) {
        await decrementVariantStock(item.product, item.variantLabel, item.quantity, session);
      }

      const orderItems = finalItems.map((item) => ({
        product: item.product,
        name: item.name,
        image: item.image,
        variantLabel: item.variantLabel,
        price: item.proposedPrice,
        quantity: item.quantity,
        subtotal: item.subtotal,
      }));

      const created = await Order.create(
        [
          {
            source: 'B2B',
            b2bMember: quote.b2bMember,
            quote: quote._id,
            buyerBusinessName: quote.buyerBusinessName,
            items: orderItems,
            shippingAddress: quote.shippingAddress,
            itemsTotal,
            shippingFee: 0,
            totalAmount: itemsTotal,
            expectedDeliveryDate,
          },
        ],
        { session },
      );
      order = created[0];

      quote.items = finalItems;
      quote.totalAmount = itemsTotal;
      quote.status = 'Approved';
      quote.reviewedBy = req.user._id;
      quote.reviewedAt = new Date();
      quote.order = order._id;
      await quote.save({ session });
    });
  } finally {
    session.endSession();
  }

  res.status(200).json({ status: 'success', data: { quote, order } });
});

// PATCH /api/v1/admin/quotes/:id/reject
exports.rejectQuote = catchAsync(async (req, res, next) => {
  const { reason } = req.body;

  const quote = await Quote.findById(req.params.id);
  if (!quote) return next(new AppError('No quote found with that ID', 404));

  if (quote.status !== 'Pending') {
    return next(new AppError(`This quote has already been ${quote.status.toLowerCase()}`, 400));
  }

  quote.status = 'Rejected';
  quote.rejectionReason = reason;
  quote.reviewedBy = req.user._id;
  quote.reviewedAt = new Date();
  await quote.save();

  res.status(200).json({ status: 'success', data: { quote } });
});
