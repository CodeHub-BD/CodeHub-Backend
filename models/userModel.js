const mongoose = require('mongoose');
const validator = require('validator');

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
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
