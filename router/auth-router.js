const express = require("express");
const router = express.Router();
const authController = require('../controller/auth-controller');
const picWheel  = require('../controller/picwheels');
const picLike = require('../controller/likemedia');
const upload = require('../middlewares/uploads');
const allusers  = require('../controller/users');


router.route("/").get(authController.home);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/allusers").get(allusers.getAllUsers);

// Upload wheelcover (1) + media (multiple)
router.post('/picwheel', upload.fields([
    { name: 'wheelcover', maxCount: 1 },
    { name: 'media', maxCount: 10 }
  ]), picWheel.createWheel);
  
// Get routes
router.get('/picwheel', picWheel.getWheel);              
router.get('/picwheelmedia', picWheel.getWheelMedia); 
router.post('/picwheellike', picLike.addLike); 
module.exports = router;