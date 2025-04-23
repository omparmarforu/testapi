const express = require("express");
const router = express.Router();
const authController = require('../controller/auth-controller');

router.route("/home").get(authController.home);
router.route("/getuser").get(authController.register);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/picwheel").post(authController.picwheel);
router.route("/picwheelmedia").post(authController.WheelMedia);

module.exports = router;