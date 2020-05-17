const express = require('express');
const authController = require('./../controllers/authController');
const problemController = require('./../controllers/problemController');

const router = express.Router();

router.post('/add', authController.protect, authController.restrictTo('admin'), problemController.add);
router.patch('/update/:id', authController.protect, authController.restrictTo('admin'), problemController.update);
router.delete('/delete/:id', authController.protect, authController.restrictTo('admin'), problemController.delete);
router.get('/:id', problemController.get);
router.get('/all', problemController.getAll);




module.exports = router;