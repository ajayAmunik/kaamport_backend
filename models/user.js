const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName:{
    type:String,
    default:""
  },
  dateOfBirth:{
    type:String,
    default:""
  },
  gender:{
    type:String
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
  email: {
    type: String,
     default: ""
  },
  photo: {
    type: String,
    required: false,
    default:""
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
  approveStatus: {
    type: Boolean,
    default: true,
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  worksDone: {
    type: Number,
     default: 0
  },
  priceRange: {
    type: String,
  },
  timeDate: {
    type: Date,
    required: false,
  },
  otherInfo: {
    type: String,
    required: false,
     default: ""
  },
  registationStatus:{
    type:Number,
    default:0
  },
  token:{
    type:String,
    default: ""
  },
  categiry: {
    type: String,
    default:""
  },
  skills:{
    type:Array,
    default:[]
  },
  availableStartTime:{
    type: String,
    default:""
  },
  availableEndTime:{
    type: String,
    default:""
  },
  language:{
    type:String
  }
});
 
module.exports =new  mongoose.model('user', UserSchema);

