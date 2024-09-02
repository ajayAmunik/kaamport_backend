const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const verification = require("../middleware/autho")


router.post("/userLogin", userController.addUser);
router.post("/userOtpVerification", userController.verifyOtpController);
router.get("/homeScreen",verification.userVerify,userController.homeScreen)
router.put("/getJob",verification.userVerify,userController.getJob)
router.get("/getJobList",verification.userVerify,userController.jobsList)

module.exports = router;
