const mongoose = require('mongoose');

// Define the schema
const LabourSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: "",
  },
  location: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  address: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  experience: { // Corrected typo
    type: String,
    default: "",
  },
  categoryId: {
    type: String,
    default: "",
  },
  services: [
    {
      serviceId: {
        type: String,
             required: true,
      },
      serviceName: {
        type: String,
      
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  otherSkills: [
    {
      serviceId: {
        type: String
     
      },
      serviceName: {
        type: String,
     
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  availableStartTime: {
    type: String,
    default: "",
  },
  availableEndTime: {
    type: String,
    default: "",
  },
  language: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Labour', LabourSchema);
