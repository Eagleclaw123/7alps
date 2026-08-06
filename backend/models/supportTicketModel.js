const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema(
  {
    b2bMember: {
      type: mongoose.Schema.ObjectId,
      ref: 'B2BMember',
      required: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Read', 'Resolved'],
      default: 'New',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('SupportTicket', supportTicketSchema, 'SupportTickets');
