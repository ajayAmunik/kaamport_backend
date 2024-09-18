const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
  laborId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Labour', 
    required: true,
  },
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services', 
        required: true,
      },
      serviceName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  dateTime: {
    type: Date,
    required: true,
  },
  otherInfo: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String, 
    }
  ]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', BookingSchema);
