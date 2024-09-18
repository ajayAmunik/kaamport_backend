const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const verification = require("../middleware/autho")


router.post("/generateUserOTP", userController.generateUserOTP);
router.post("/resendOTP", userController.resendOTP)
router.post("/userOtpVerification", userController.verifyOtpController);
router.post("/addUserDetails", verification.userVerify, userController.addUserDetails);

module.exports = router;
