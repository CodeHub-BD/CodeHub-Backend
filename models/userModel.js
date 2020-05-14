const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a name!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password!'],
    select: false,
  },
  profilePic: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',

  },
  rating: {
    type: Number,
    default: 0,
  },
  contribution: {
    type: Number,
    default: 0,
  },
  social: [
    {
      name: {
        type: String,
        enum: ['facebook', 'twitter', 'instagram', 'github', 'stackoverflow'],
      },
      url: {
        type: String,
      },
    },
  ],
  submissions: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Submission',
    },
  ],
  userStat: {
    submission: {
      type: Number,
      default: 0,
    },
    ac: {
      type: Number,
      default: 0,
    },
    wa: {
      type: Number,
      default: 0,
    },
    tle: {
      type: Number,
      default: 0,
    },
    mle: {
      type: Number,
      default: 0,
    },
    re: {
      type: Number,
      default: 0,
    },
  },
  institute: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
