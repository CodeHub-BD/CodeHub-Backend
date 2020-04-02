const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from Users');
});

router.post('/CreateUser', userController.CreateUser);

module.exports = router;
