const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express();

router.get('/userDetail', authController.getUserDetail);
router.get('/getAllUser', userController.getAllUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
