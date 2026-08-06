const SupportTicket = require('../models/supportTicketModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ── B2B member-facing ─────────────────────────────────────────────────────────

// POST /api/v1/b2b/support-tickets
exports.createSupportTicket = catchAsync(async (req, res, next) => {
  const { subject, message } = req.body;

  if (!subject || !subject.trim()) {
    return next(new AppError('Please provide a subject', 400));
  }
  if (!message || !message.trim()) {
    return next(new AppError('Please provide a message', 400));
  }

  const ticket = await SupportTicket.create({
    b2bMember: req.b2bMember._id,
    subject,
    message,
  });

  res.status(201).json({ status: 'success', data: { ticket } });
});

// ── Admin ─────────────────────────────────────────────────────────────────────

// GET /api/v1/admin/support-tickets
// Supports ?page=1&limit=10&status=New&search=...
// `search` matches subject/message, and the submitting B2B member's name/email/business name.
exports.getAllSupportTickets = catchAsync(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 10));
  const { status, search } = req.query;

  const match = {};
  if (status) match.status = status;

  if (search && search.trim()) {
    const regex = new RegExp(escapeRegex(search.trim()), 'i');
    match.$or = [
      { subject: regex },
      { message: regex },
      { 'memberInfo.name': regex },
      { 'memberInfo.email': regex },
      { 'memberInfo.businessName': regex },
    ];
  }

  const [listResult, summaryResult] = await Promise.all([
    SupportTicket.aggregate([
      {
        $lookup: {
          from: 'B2BMembers',
          localField: 'b2bMember',
          foreignField: '_id',
          as: 'memberInfo',
        },
      },
      { $unwind: { path: '$memberInfo', preserveNullAndEmptyArrays: true } },
      { $match: match },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
          totalCount: [{ $count: 'count' }],
        },
      },
    ]),
    // Summary cards reflect ALL tickets, independent of the current search/status filter.
    SupportTicket.aggregate([
      {
        $group: {
          _id: null,
          totalTickets: { $sum: 1 },
          newCount: { $sum: { $cond: [{ $eq: ['$status', 'New'] }, 1, 0] } },
          resolvedCount: { $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] } },
        },
      },
    ]),
  ]);

  const tickets = (listResult[0]?.data || []).map((ticket) => {
    const { memberInfo, ...rest } = ticket;
    return {
      ...rest,
      b2bMember: ticket.b2bMember
        ? {
            _id: memberInfo?._id,
            name: memberInfo?.name,
            email: memberInfo?.email,
            businessName: memberInfo?.businessName,
          }
        : undefined,
    };
  });

  const total = listResult[0]?.totalCount?.[0]?.count || 0;
  const summary = summaryResult[0] || {};

  res.status(200).json({
    status: 'success',
    results: tickets.length,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    data: { tickets },
    summary: {
      totalTickets: summary.totalTickets || 0,
      newCount: summary.newCount || 0,
      resolvedCount: summary.resolvedCount || 0,
    },
  });
});

// PATCH /api/v1/admin/support-tickets/:id/status
exports.updateSupportTicketStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['New', 'Read', 'Resolved'];

  if (!allowedStatuses.includes(status)) {
    return next(new AppError(`Status must be one of: ${allowedStatuses.join(', ')}`, 400));
  }

  const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!ticket) return next(new AppError('No support ticket found with that ID', 404));

  res.status(200).json({ status: 'success', data: { ticket } });
});

// DELETE /api/v1/admin/support-tickets/:id
exports.deleteSupportTicket = catchAsync(async (req, res, next) => {
  const ticket = await SupportTicket.findByIdAndDelete(req.params.id);
  if (!ticket) return next(new AppError('No support ticket found with that ID', 404));

  res.status(204).json({ status: 'success', data: null });
});
