const express = require("express");
const router = express.Router();
const servicesController = require("../controller/servicesController");
const verification = require("../middleware/autho")

router.post('/createServices',verification.userVerify, servicesController.createServices);
router.get('/getAllServices', verification.userVerify, servicesController.getAllServices);
router.get('/getServicesByServiceId', verification.userVerify, servicesController.getServicesByServiceId);
router.put('/editServices', verification.userVerify, servicesController.editServices);

module.exports = router;
