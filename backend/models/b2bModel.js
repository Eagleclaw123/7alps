const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const b2bSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    businessName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (el) {
          return !this.isModified('password') || el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    lastLoginTime: {
      type: Date,
      default: Date.now,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

// Hash password before saving
b2bSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Check if password is correct
b2bSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const B2BMember = mongoose.model('B2BMember', b2bSchema, 'B2BMembers');

module.exports = B2BMember;
