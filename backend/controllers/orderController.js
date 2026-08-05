const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Settings = require('../models/settingsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { decrementVariantStock } = require('./productController');

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Reads the admin-configured delivery window and returns a Date that far out
// from now. Shared by the COD path here and the Razorpay verify path.
exports.getExpectedDeliveryDate = async () => {
  const settings = await Settings.getSingleton();
  return new Date(Date.now() + settings.expectedDeliveryDays * MS_PER_DAY);
};

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

const REQUIRED_ADDRESS_FIELDS = ['name', 'phone', 'line1', 'city', 'state', 'pincode'];

// Shared by COD (createOrder below) and the Razorpay verify-payment flow
// (paymentController.js): validates the customer's cart, decrements stock for
// each line atomically, creates the Order, and clears the cart — all within
// the given session. `paymentFields` lets callers set paymentMethod/paymentStatus/
// razorpay* fields; defaults to the COD shape when omitted.
exports.buildOrderFromCart = async (customerId, shippingAddress, session, paymentFields = {}) => {
  const cart = await Cart.findOne({ customer: customerId }).populate('items.product').session(session);
  if (!cart || !cart.items.length) {
    throw new AppError('Your cart is empty', 400);
  }

  const orderItems = [];

  for (const cartItem of cart.items) {
    const product = cartItem.product;
    if (!product) throw new AppError('One of the products in your cart no longer exists', 400);

    const variant = product.variants.find((v) => v.label === cartItem.variantLabel);
    if (!variant) throw new AppError(`Variant "${cartItem.variantLabel}" no longer exists for "${product.name}"`, 400);

    await decrementVariantStock(product._id, cartItem.variantLabel, cartItem.quantity, session);

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      variantLabel: cartItem.variantLabel,
      price: variant.price,
      quantity: cartItem.quantity,
      subtotal: variant.price * cartItem.quantity,
    });
  }

  const itemsTotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = itemsTotal <= FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const totalAmount = itemsTotal + shippingFee;
  const expectedDeliveryDate = await exports.getExpectedDeliveryDate();

  const created = await Order.create(
    [
      {
        customer: customerId,
        items: orderItems,
        shippingAddress,
        itemsTotal,
        shippingFee,
        totalAmount,
        expectedDeliveryDate,
        ...paymentFields,
      },
    ],
    { session },
  );

  cart.items = [];
  await cart.save({ session });

  return created[0];
};

// "Buy Now" path: builds an order from a client-specified list of
// { productId, variantLabel, quantity } items instead of the persisted cart —
// the cart is never read or touched, so a Buy Now purchase can't clear or mix
// with whatever else the customer already has sitting in their cart. Prices
// are always looked up from the product/variant here, never trusted from the
// client, exactly like buildOrderFromCart above.
exports.buildOrderFromItems = async (customerId, shippingAddress, items, session, paymentFields = {}) => {
  if (!Array.isArray(items) || !items.length) {
    throw new AppError('No items provided for this order', 400);
  }

  const orderItems = [];

  for (const requested of items) {
    const { productId, variantLabel, quantity } = requested;
    if (!productId || !variantLabel || !quantity) {
      throw new AppError('Each item requires productId, variantLabel, and quantity', 400);
    }

    const product = await Product.findOne({ _id: productId, active: true }).session(session);
    if (!product) throw new AppError('One of the products in your order is no longer available', 400);

    const variant = product.variants.find((v) => v.label === variantLabel);
    if (!variant) throw new AppError(`Variant "${variantLabel}" no longer exists for "${product.name}"`, 400);

    await decrementVariantStock(product._id, variantLabel, quantity, session);

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      variantLabel,
      price: variant.price,
      quantity,
      subtotal: variant.price * quantity,
    });
  }

  const itemsTotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = itemsTotal <= FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const totalAmount = itemsTotal + shippingFee;
  const expectedDeliveryDate = await exports.getExpectedDeliveryDate();

  const created = await Order.create(
    [
      {
        customer: customerId,
        items: orderItems,
        shippingAddress,
        itemsTotal,
        shippingFee,
        totalAmount,
        expectedDeliveryDate,
        ...paymentFields,
      },
    ],
    { session },
  );

  return created[0];
};

// POST /api/v1/customer/orders
// Optional `items` in the body (Buy Now) bypasses the cart entirely; omitting
// it (regular cart checkout) keeps the existing cart-based behavior.
exports.createOrder = catchAsync(async (req, res, next) => {
  const { shippingAddress, items } = req.body;

  if (!shippingAddress || REQUIRED_ADDRESS_FIELDS.some((field) => !shippingAddress[field])) {
    return next(new AppError(`Please provide a complete shipping address (${REQUIRED_ADDRESS_FIELDS.join(', ')})`, 400));
  }

  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      order = Array.isArray(items) && items.length
        ? await exports.buildOrderFromItems(req.customer._id, shippingAddress, items, session)
        : await exports.buildOrderFromCart(req.customer._id, shippingAddress, session);
    });
  } finally {
    session.endSession();
  }

  res.status(201).json({ status: 'success', data: { order } });
});

// GET /api/v1/customer/orders
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ customer: req.customer._id }).sort('-createdAt');

  res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});

// GET /api/v1/customer/orders/:id
exports.getMyOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id, customer: req.customer._id });
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});

// GET /api/v1/b2b/orders
exports.getMyB2BOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ b2bMember: req.b2bMember._id, source: 'B2B' }).sort('-createdAt');

  res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});

// GET /api/v1/b2b/orders/:id
exports.getMyB2BOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id, b2bMember: req.b2bMember._id, source: 'B2B' });
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/v1/admin/orders
// Supports ?page=1&limit=10&status=Confirmed&search=...
// `search` matches the order's short ID, status/payment fields, buyer business
// name, any item's product/variant name, every shipping-address field, and
// the linked customer's or B2B member's name/email/mobile/business name.
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 10));
  const { status, search } = req.query;

  const match = {};
  if (status) match.status = status;

  if (search && search.trim()) {
    const regex = new RegExp(escapeRegex(search.trim()), 'i');
    match.$or = [
      { idStr: regex },
      { status: regex },
      { paymentMethod: regex },
      { paymentStatus: regex },
      { source: regex },
      { buyerBusinessName: regex },
      { 'items.name': regex },
      { 'items.variantLabel': regex },
      { 'shippingAddress.name': regex },
      { 'shippingAddress.line1': regex },
      { 'shippingAddress.line2': regex },
      { 'shippingAddress.city': regex },
      { 'shippingAddress.state': regex },
      { 'shippingAddress.pincode': regex },
      { 'customerInfo.name': regex },
      { 'customerInfo.mobile': regex },
      { 'b2bInfo.name': regex },
      { 'b2bInfo.email': regex },
      { 'b2bInfo.businessName': regex },
    ];
  }

  const [listResult, summaryResult] = await Promise.all([
    Order.aggregate([
      { $addFields: { idStr: { $toUpper: { $toString: '$_id' } } } },
      {
        $lookup: {
          from: 'Customers',
          localField: 'customer',
          foreignField: '_id',
          as: 'customerInfo',
        },
      },
      { $unwind: { path: '$customerInfo', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'B2BMembers',
          localField: 'b2bMember',
          foreignField: '_id',
          as: 'b2bInfo',
        },
      },
      { $unwind: { path: '$b2bInfo', preserveNullAndEmptyArrays: true } },
      { $match: match },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
          totalCount: [{ $count: 'count' }],
        },
      },
    ]),
    // Summary cards reflect ALL orders, independent of the current search/status filter.
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          pendingCount: {
            $sum: { $cond: [{ $in: ['$status', ['Confirmed', 'Processing']] }, 1, 0] },
          },
          deliveredCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] },
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'Paid'] }, '$totalAmount', 0] },
          },
        },
      },
    ]),
  ]);

  const orders = (listResult[0]?.data || []).map((order) => {
    const { customerInfo, b2bInfo, idStr, ...rest } = order;
    return {
      ...rest,
      customer: order.customer
        ? { _id: customerInfo?._id, name: customerInfo?.name, mobile: customerInfo?.mobile }
        : undefined,
      b2bMember: order.b2bMember
        ? {
            _id: b2bInfo?._id,
            name: b2bInfo?.name,
            email: b2bInfo?.email,
            businessName: b2bInfo?.businessName,
          }
        : undefined,
    };
  });

  const total = listResult[0]?.totalCount?.[0]?.count || 0;
  const summary = summaryResult[0] || {};

  res.status(200).json({
    status: 'success',
    results: orders.length,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    data: { orders },
    summary: {
      totalOrders: summary.totalOrders || 0,
      pendingCount: summary.pendingCount || 0,
      deliveredCount: summary.deliveredCount || 0,
      totalRevenue: summary.totalRevenue || 0,
    },
  });
});

// GET /api/v1/admin/orders/:id
exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('customer', 'name mobile');
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});

// PATCH /api/v1/admin/orders/:id/status
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!allowedStatuses.includes(status)) {
    return next(new AppError(`Status must be one of: ${allowedStatuses.join(', ')}`, 400));
  }

  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});
