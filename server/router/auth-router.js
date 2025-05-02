const express = require("express");
const router = express.Router();
const authController = require('../controller/auth-controller');
const { picWheel } = require('../controller/picwheels');
const upload = require('../middlewares/uploads');


router.route("/").get(authController.home);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

// Upload wheelcover (1) + media (multiple)
router.post('/picwheel', upload.fields([
    { name: 'wheelcover', maxCount: 1 },
    { name: 'media', maxCount: 10 }
  ]), picWheel);
  
  module.exports = router;