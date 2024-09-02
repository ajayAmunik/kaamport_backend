const express = require("express");
const router = express.Router();
const reportController = require("../controller/report")
const verification = require("../middleware/autho")


router.post("/report",verification.userVerify,reportController.newReport)

module.exports = router