const mongoose = require('mongoose');

// Define the schema
const LabourSchema = new mongoose.Schema({
    userId:{
     type:String,
     required: true,

    },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number, // Changed to Number
    default: null
  },
  gender: {
    type: String,
    default: "" // Added default to maintain consistency
  },
  location: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    }
  },
  address: {
    type: String,
    default: "" // Added default value
  },
  photo: {
    type: String,
    default: ""
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  experimnce: { // Correct typo to experience
    type: String,
    default: ""
  },
  categoryId: {
    type: String,
    default: ""
  },
  skills: {
    type: [String], // Array of strings to represent skills
    default: []
  },
  otherSkills: {
    type: String,
    default: ""
  },
  availableStartTime: {
    type: String,
    default: ""
  },
  availableEndTime: {
    type: String,
    default: ""
  },
  language: {
    type: String,
    default: "" // Added default value
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model('labours', LabourSchema); 
