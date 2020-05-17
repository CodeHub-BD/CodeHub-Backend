const Compiler = require('./../compiler/compiler');
const catchAsync = require('./../utils/catchAsync');
const Submisson = require('./../models/submissionModel');

exports.compile = catchAsync(async (req, res, next) => {
  const { sourceCode, language } = req.body;
  const compiler = new Compiler(sourceCode, language);
  const output = await compiler.compile();

  console.log('It takes ' + output.time + " ms");
  saveSubmissiontoDatabase(sourceCode, output, req);
  res.status(200).json({ message: 'Compiled', output: output.output });
});

const saveSubmissiontoDatabase = (sourceCode, output, req) => {
  const newSubmission = Submisson.create({
    sourceCode,
    problem: req.user._id,
    submittedBy: req.user._id,
    language: "c++",
    submittedOn: Date.now(),
    isJudged: false,
    time: output.time,
    memory: 512,
    verdict: "ac"
  });
}

