const Compiler = require('./../compiler/compiler');

exports.compile = async (req, res, next) => {
  const { sourceCode, language } = req.body;
  const compiler = new Compiler(sourceCode, language);

  const output = await compiler.compile(next);
  if (output) res.status(200).json({ message: 'Compiled', output: output });
};
