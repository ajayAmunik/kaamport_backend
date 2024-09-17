const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const verification = require("../middleware/autho")


router.post("/userLogin", userController.addUser);
router.post("/userOtpVerification", userController.verifyOtpController);

module.exports = router;
