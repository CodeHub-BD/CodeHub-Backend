const express = require('express');
const Compiler = require('../compiler/compiler');

const router = express.Router();

router.route('/').post((req, res) => {
  const { sourceCode, language } = req.body;
  const compiler = new Compiler(sourceCode, language);
  compiler.compile();
  res.json({ message: 'Compiled' });
});

module.exports = router;
