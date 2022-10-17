const express = require("express");
const router = express.Router();

const {register,login,getMe,forgotPassword}=require('../controllers/userController');

// Auth protect middleware
const{protect} = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/forgotpassword').post(forgotPassword);
module.exports = router;