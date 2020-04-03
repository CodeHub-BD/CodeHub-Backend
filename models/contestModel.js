const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'A contest must have a creator!'],
  },
  problemSetters: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  ],
  problems: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Problem',
    },
  ],
  start: {
    type: Date,
    required: [true, 'A contest must start sometime!'],
  },
  duration: {
    type: Number,
    default: 150, // 2.5 Hours
  },
  announcements: [
    {
      title: String,
      description: String,
      time: { type: Date, default: Date.now() },
    },
  ],
  questions: [
    {
      problemId: String,
      question: String,
      time: { type: Date, default: Date.now() },
    },
  ],
  editorial: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
});

const contestModel = mongoose.model('Contest', contestSchema);
module.exports = contestModel;
