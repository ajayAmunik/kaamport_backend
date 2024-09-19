const express = require("express");
const router = express.Router();
const LabourController = require("../controller/labourController");
const verification = require("../middleware/autho")



router.post("/addLabour", verification.userVerify,LabourController.createLabour);
router.get("/getLabors",verification.userVerify,LabourController.getLabors);
router.put("/editLabor",verification.userVerify,LabourController.editLabor);
router.post("/getLabourById",verification.userVerify,LabourController.getLabourById)


module.exports = router;
