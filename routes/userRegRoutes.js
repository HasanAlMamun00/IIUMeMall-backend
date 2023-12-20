const express = require("express");
const router = express.Router();
const usersRegControllers = require("../controllers/userRegControllers");

// here user registration and updates her information routes, 
router.route('/').post(usersRegControllers.postRegUser).patch(usersRegControllers.updateUserInfo).get(usersRegControllers.getAllUserControllers).put(usersRegControllers.putUserRoleControllers)
// get user information
router.route('/:email').get(usersRegControllers.getUserInfo)

module.exports = router;