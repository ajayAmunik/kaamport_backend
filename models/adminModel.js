const mongoose = require("mongoose");

// Define the schema
const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  password: {
    type: String,
  },

  gender: {
    type: String,
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
  email: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    required: false,
    default: "",
  },
  otp: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  timeDate: {
    type: Date,
    required: false,
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports = new mongoose.model("adminUser", adminSchema);
