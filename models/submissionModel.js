const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  sourceCode: {
    type: String,
    required: [true, 'You can not submit without a source code'],
  },
  problem: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Problem',
    required: [true, 'A submission must belong to a problem'],
  },
  submittedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'A submission must have an author'],
  },
  language: {
    type: String,
    enum: ['c++', 'python'],
    required: [true, 'A submission must belong one language!'],
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  isJudged: {
    type: Boolean,
    default: false,
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
