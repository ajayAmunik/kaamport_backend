let reviewModel = require("../models/review");
let userModel = require("../models/user")

let newReview = async (req, res) => {
  try {
    let { rating, review, fromId } = req.body;

    let findReview = await reviewModel.findOne({ toId: req.userId.id, fromId });

    if (findReview) {
      findReview.rating = parseFloat(rating.toFixed(1)) || 0;
      findReview.review = review;
      await findReview.save();
    } else {
      let newReview = new reviewModel({
        rating: parseFloat(rating.toFixed(1)) || 0,
        review,
        fromId: fromId,
        toId:req.userId.id,
      });
      await newReview.save();
    }

    const updatedReview = await reviewModel.findOne({
      fromId: fromId,
      toId:req.userId.id,
    });

    return res.status(200).send({
      message: "Review added/updated successfully",
      data: updatedReview,
      responseCode: 200,
    });
  } catch (error) {
    console.log(error);
    
    return res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};
let getReviewsList = async (req, res) => {
    try {
      let reviews = await reviewModel.find({ toId: req.userId.id });
  
      if (!reviews.length) {
        return res.status(404).send({
          message: "No reviews found for the specified user",
          responseCode: 404,
        });
      }
  
      let reviewsData = await Promise.all(reviews.map(async review => {
        let findUser = await userModel.findById(review.fromId);
        return findUser ? { ...review.toObject(), fromPhoto: findUser.photo } : review;
      }));
  
      return res.status(200).send({
        message: "List of reviews",
        data: reviewsData,
        responseCode: 200,
      });
  
    } catch (error) {
      return res.status(500).send({
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  
module.exports = {
  newReview,
  getReviewsList
};
