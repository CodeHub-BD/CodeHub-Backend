const express = require('express');
const Compiler = require('../compiler/compiler');

const router = express.Router();

router.route('/').post(async (req, res) => {
  const { sourceCode, language } = req.body;
  const compiler = new Compiler(sourceCode, language);
  try {
    const output = await compiler.compile();
    res.status(200).json({ message: 'Compiled', output: output });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error });
  }
});

module.exports = router;
