const Compiler = require('./../compiler/compiler');

exports.compile = async (req, res, next) => {
  const { sourceCode, language } = req.body;
  const compiler = new Compiler(sourceCode, language);
  await compiler.compile(next, res);
};
