const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController")
const verification = require("../middleware/autho")


router.post("/createCategory",verification.userVerify, categoryController.createCategory)
router.put("/editCategory", verification.userVerify, categoryController.editCategory)
router.get("/listOfAllCategory", verification.userVerify, categoryController.listOfAllCategory)
router.post("/getCategoryById", verification.userVerify, categoryController.getCategoryById)
router.post("/toggleCategory", verification.userVerify,categoryController.toggleCategory)

module.exports = router