const Compiler = require('./../compiler/compiler');
const catchAsync = require('./../utils/catchAsync');

exports.compile = catchAsync(async (req, res, next) => {
  const { sourceCode, language } = req.body;
  const compiler = new Compiler(sourceCode, language);
  const output = await compiler.compile();
  res.status(200).json({ message: 'Compiled', output: output });
});
