const express = require("express");
const router = express.Router();
const authController = require('../controller/auth-controller');
const picWheel  = require('../controller/picwheels');
const picLike = require('../controller/likemedia');
const upload = require('../middlewares/uploads');
const allusers  = require('../controller/users');


router.route("/home").get(authController.home);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/search").get(allusers.searchUsers);

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