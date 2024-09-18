const BookingModel = require('../models/bookingModel');
const LabourModel = require('../models/labourModel');
const ServicesModel = require('../models/servicesModel');

const createBooking = async (req, res) => {
  try {
    const { laborId, services, dateTime, otherInfo, images } = req.body;

    // Validate labor
    const existingLabour = await LabourModel.findById(laborId);
    if (!existingLabour) {
      return res.status(400).json({ responseCode: 400, message: 'Labor not found' });
    }

    // Validate services
    for (let service of services) {
      let existingService = await ServicesModel.findById(service.serviceId);
      if (!existingService) {
        return res.status(400).json({ responseCode: 400, message: `Service with ID ${service.serviceId} not found` });
      }
    }

    // Create new booking
    const newBooking = new BookingModel({
      laborId,
      services,
      dateTime,
      otherInfo,
      images
    });

    // Save booking to database
    const savedBooking = await newBooking.save();

    return res.status(200).json({ responseCode: 200, message: 'Booking created successfully', data: savedBooking });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports={
    createBooking
}