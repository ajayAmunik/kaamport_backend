const express = require("express");
const router = express.Router();
const verification = require("../middleware/autho")
const reviewController = require("../controller/review")


router.post("/addReview", verification.userVerify,reviewController.newReview )
router.get("/listOfReviews",verification.userVerify,reviewController.getReviewsList)

module.exports = router;