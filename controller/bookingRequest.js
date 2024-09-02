const bookingRequestModel = require("../models/bookingRequest");
const bookingLocationModel = require("../models/BookingAddress");
const helper = require("../helper/helper");
const mongoose = require("mongoose");
const bookingImageModel = require("../models/bookingRequestImages");

let NewBookingRequest = async (req, res) => {
  try {
    let userId = req.userId.id;
    let { workerId, services } = req.body;

    // Normalize and sort services array to ensure consistent comparison
    services = services.sort();

    // Check if a booking request already exists with the same userId, workerId, and services
    let existingBooking = await bookingRequestModel.findOne({
      userId: userId,
      workerId: workerId,
      services: services,
    });

    if (existingBooking) {
      return res.status(400).send({
        message: "Booking request already exists",
        data: existingBooking,
        responseStatus: 400,
      });
    }

    // If no existing booking request is found, create a new one
    let newBooking = new bookingRequestModel({
      userId: userId,
      workerId: workerId,
      services: services,
    });

    await newBooking.save();

    res.status(200).send({
      message: "Booking request added",
      data: newBooking,
      responseStatus: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};


let RequestUpdateWithDate = async (req, res) => {
  try {
    let { requestId, date } = req.body;

    let findBookingRequest = await bookingRequestModel.findById({
      _id: requestId,
    });

    if (!findBookingRequest) {
      res.status(200).send({
        message: "booking request id is required",
        data: {},
        responseStatus: 400,
      });
    } else if (!date) {
      res.status(200).send({
        message: "date is required",
        data: {},
        responseStatus: 400,
      });
    } else {
      await bookingRequestModel.findByIdAndUpdate(
        { _id: findBookingRequest._id },
        {
          $set: {
            date: date,
          },
        }
      );
      res.status(200).send({
        message: "successfully date added to request booking",
        data: {},
        responseStatus: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "server error",
      error: error.message,
    });
  }
};


let RequestUpdateWithTime = async (req, res) => {
  try {
    let { requestId, time } = req.body;

    let findBookingRequest = await bookingRequestModel.findById({
      _id: requestId,
    });

    if (!findBookingRequest) {
      res.status(200).send({
        message: "booking request id is require",
        data: {},
        responseStatus: 400,
      });
    } else if (!time) {
      res.status(200).send({
        message: "time is require",
        data: {},
        responseStatus: 400,
      });
    } else {
      await bookingRequestModel.findByIdAndUpdate(
        { _id: findBookingRequest._id },
        {
          $set: {
            time: time,
          },
        }
      );
      res.status(200).send({
        message: "successfully time added to request booking",
        data: {},
        responseStatus: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "server error",
      error: error.message,
    });
  }
};


let BookingLocation = async (req, res) => {
  try {
    let { bookingRequestId, location, latitude, longitude } = req.body;

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

    if (!bookingRequestId) {
      res.status(200).send({
        message: "booking request id is required",
        data: {},
        responseStatus: 400,
      });
    } else {
      const existingBookingLocation = await bookingLocationModel.findOne({
        bookingRequestId: bookingRequestId,
        location: location,
      });

      if (existingBookingLocation) {
        return res.status(409).send({
          message: "Address already exists for this booking request",
          data: existingBookingLocation,
          responseStatus: 409,
        });
      } else {
        let newBookingLocation = await new bookingLocationModel({
          userId: req.userId.id,
          latitude: latitude ? latitude : "",
          longitude: longitude ? longitude : "",
          location: location,
          bookingRequestId: bookingRequestId,
        });
        await newBookingLocation.save();

        res.status(200).send({
          message: "booking request is added",
          data: newBookingLocation,
          responseStatus: 200,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "server error",
      error: error.message,
    });
  }
};


let ListOfBookingAddresses = async (req, res) => {
  try {
    const { bookingRequestId } = req.body;

    if (
      !bookingRequestId ||
      !mongoose.Types.ObjectId.isValid(bookingRequestId)
    ) {
      return res.status(400).send({
        message: "Invalid or  booking request ID is require",
        data: {},
        responseStatus: 400,
      });
    } else {
      const addresses = await bookingLocationModel.find({
        bookingRequestId: bookingRequestId,
      });

      if (addresses.length === 0) {
        return res.status(200).send({
          message:
            "No booking addresses found for the provided booking request ID",
          data: [],
          responseStatus: 400,
        });
      } else {
        res.status(200).send({
          message: "Booking addresses retrieved successfully",
          data: addresses,
          responseStatus: 200,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message,
      responseStatus: 500,
    });
  }
};


let UpdateBookingAddress = async (req, res) => {
  try {
    const { locationId, location, latitude, longitude } = req.body;

    if (!locationId) {
      return res.status(400).send({
        message: "locationId ID is required",
        data: {},
        responseStatus: 400,
      });
    } else {
      const existingBookingLocation = await bookingLocationModel.findById({
        _id: locationId,
      });

      if (!existingBookingLocation) {
        return res.status(404).send({
          message: "Booking location not found",
          data: {},
          responseStatus: 404,
        });
      } else {
        // Check if the new location already exists for this booking request (to prevent duplicates)

        existingBookingLocation.location =
          location || existingBookingLocation.location;
        existingBookingLocation.latitude =
          latitude || existingBookingLocation.latitude;
        existingBookingLocation.longitude =
          longitude || existingBookingLocation.longitude;

        await existingBookingLocation.save();

        res.status(200).send({
          message: "Booking location updated successfully",
          data: existingBookingLocation,
          responseStatus: 200,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message,
      responseStatus: 500,
    });
  }
};


let DeleteBookingAddress = async (req, res) => {
  try {
    const { locationId } = req.body;

    // Validate required fields
    if (!locationId) {
      return res.status(400).send({
        message: "location id is required",
        data: {},
        responseStatus: 400,
      });
    } else {
      const deletedBookingLocation = await bookingLocationModel.findById({
        _id: locationId,
      });
      if (!deletedBookingLocation) {
        return res.status(404).send({
          message: "Booking address not found",
          data: {},
          responseStatus: 404,
        });
      } else {
        const deletedBookingLocation =
          await bookingLocationModel.findByIdAndDelete({
            _id: locationId,
          });
        res.status(200).send({
          message: "Booking address deleted successfully",
          data: deletedBookingLocation,
          responseStatus: 200,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message,
      responseStatus: 500,
    });
  }
};


let RequestUpdateWithInfo = async (req, res) => {
  try {
    let { requestId, info } = req.body;

    let findBookingRequest = await bookingRequestModel.findById({
      _id: requestId,
    });

    if (!findBookingRequest) {
      res.status(200).send({
        message: "booking request id is require",
        data: {},
        responseStatus: 400,
      });
    } else {
      await bookingRequestModel.findByIdAndUpdate(
        { _id: findBookingRequest._id },
        {
          $set: {
            otherInfo: info,
          },
        }
      );
      res.status(200).send({
        message: "successfully information  added to request booking",
        data: {},
        responseStatus: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "server error",
      error: error.message,
    });
  }
};

// Function to create a new bookingImage record
let BookingImages = async (req, res) => {
  try {
    const { images, bookingRequestId } = req.body;

    
    let existingBooking = await bookingRequestModel.findById({
        _id: bookingRequestId,
      });


    if (!images || !bookingRequestId) {
      return res.status(200).json({
        message: "All fields are required",
        data: {},
        responseCode: 400,
      });
    } else if (!existingBooking) {
      return res.status(200).json({
        message: "booking request not found with this id",
        data: {},
        responseCode: 400,
      });
    } else {
      const newBookingImage = new bookingImageModel({
        images,
        userId: req.userId.id,
        bookingRequestId,
      });
      const savedBookingImage = await newBookingImage.save();

      await bookingRequestModel.findByIdAndUpdate({
        _id: bookingRequestId,
      },{
        status:"request sent"
      });


      res.status(201).json({
        message: "Booking image created successfully",
        bookingImage: savedBookingImage,
      });
    }
  } catch (error) {
    console.error("Error creating booking image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

let CancleRequest = async (req, res) => {
    try {
      const {bookingRequestId } = req.body;
  
      
      let existingBooking = await bookingRequestModel.findById({
          _id: bookingRequestId,
        });
  
  
      if (!existingBooking) {
        return res.status(200).json({
          message: "booking request not found with this id",
          data: {},
          responseCode: 400,
        });
      } else {

        
        await bookingRequestModel.findByIdAndUpdate({
          _id: bookingRequestId,
        },{
          status:"canceled"
        });
  
  
        res.status(201).json({
          message: "Booking request is canceled",
          data: {},
          responseCode: 200
        });
      }
    } catch (error) {
      
      res.status(500).json({ 
        message:"server error",
        error: message.error
       });
    }
  };
  
  

module.exports = {
  NewBookingRequest,
  RequestUpdateWithDate,
  RequestUpdateWithTime,
  BookingLocation,
  ListOfBookingAddresses,
  UpdateBookingAddress,
  DeleteBookingAddress,
  RequestUpdateWithInfo,
  BookingImages,
  CancleRequest
};
