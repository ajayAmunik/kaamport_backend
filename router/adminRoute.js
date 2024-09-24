const express = require('express');
const router = express.Router();
const adminController= require('../controller/adminController');
const verification = require("../middleware/autho")

// Route for creating a new booking
router.post('/createAdmin',  adminController.createAdmin);
router.post("/adminLogin",adminController.adminLogin)

module.exports = router;
