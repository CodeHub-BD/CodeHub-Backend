const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  sourceCode: {
    type: String,
    required: [true, "You can't submit without a source code"],
  },
  problem: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Problem',
  },
  submittedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  language: {
    type: String,
    enum: ['c++', 'c', 'java', 'python'],
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: Number,
  },
  memory: {
    type: Number,
  },
  verdict: {
    type: String,
    enum: ['ac', 'wa', 'tle', 're', 'me'],
  },
});

const submissionModel = new mongoose.model('Submission', submissionSchema);
module.exports = submissionModel;
