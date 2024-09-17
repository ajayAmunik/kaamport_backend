const express = require("express");
const router = express.Router();
const LabourController = require("../controller/labourController");
const verification = require("../middleware/autho")



router.post("/addLabour", verification.userVerify,LabourController.createLabour);


module.exports = router;
