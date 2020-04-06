const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.send('All Problems'))
  .post((req, res) => res.send('Add problems'));
