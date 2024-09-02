let bookingRequestController = require("../controller/bookingRequest")
const express = require("express")
const router = express.Router()
const verification = require("../middleware/autho")

router.post("/bookingRequest",verification.userVerify,bookingRequestController.NewBookingRequest)
router.put("/requestUpdateWithDate",verification.userVerify,bookingRequestController.RequestUpdateWithDate)
router.put("/requestUpdateWithTime",verification.userVerify,bookingRequestController.RequestUpdateWithTime)
router.post("/bookingAddressesList",verification.userVerify,bookingRequestController.ListOfBookingAddresses)
router.put("/updateBookingLocation",verification.userVerify,bookingRequestController.UpdateBookingAddress)
router.delete("/deleteBookingAddress",verification.userVerify,bookingRequestController.DeleteBookingAddress)
router.post("/addBookingAddress",verification.userVerify,bookingRequestController.BookingLocation)
router.put("/addBookingInfo",verification.userVerify,bookingRequestController.RequestUpdateWithInfo)
router.post("/bookingImages",verification.userVerify,bookingRequestController.BookingImages)
router.put("/canceledBookingRequest",verification.userVerify, bookingRequestController.CancleRequest)


module.exports = router;
