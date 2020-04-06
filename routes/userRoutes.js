const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get((req, res) => {
  res.send('Hello from Users');
});

//router.post('/CreateUser', userController.CreateUser);

module.exports = router;
