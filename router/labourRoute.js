const express = require("express");
const router = express.Router();
const LabourController = require("../controller/labourController");
const verification = require("../middleware/autho")



router.post("/addLabour", verification.userVerify,LabourController.createLabour);
router.get("/getLabors",verification.userVerify,LabourController.getLabors);
router.put("/editLabor",verification.userVerify,LabourController.editLabor);


module.exports = router;
