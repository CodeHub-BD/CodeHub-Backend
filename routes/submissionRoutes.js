const express = require('express');
const submissionController = require('./../controllers/submissionController');

const router = express.Router();

router.post('/', submissionController.compile);

module.exports = router;
