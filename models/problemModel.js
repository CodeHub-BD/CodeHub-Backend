const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A problem must have a name!'],
    trim: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  difficulty: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, 'A problem must have a description!'],
    trim: true,
  },
  openTestCases: [
    {
      input: String,
      output: String,
    },
  ],
  closedTestCases: [
    {
      input: String,
      output: String,
    },
  ],
  note: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  timeLimit: {
    type: Number,
    default: 10000,
  },
  memoryLimit: {
    type: Number,
    default: 268435456, // 256 MB
  },
  contestId: [
    {
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  stat: {
    submissions: { type: Number, default: 0 },
    ac: { type: Number, default: 0 },
    tle: { type: Number, default: 0 },
    wa: { type: Number, default: 0 },
    mle: { type: Number, default: 0 },
    re: { type: Number, default: 0 },
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  sourceSite: {
    name: { type: String, default: 'codehub' },
    url: { type: String },
  },
});

const problemModel = mongoose.model(problemSchema);
module.exports = problemModel;
