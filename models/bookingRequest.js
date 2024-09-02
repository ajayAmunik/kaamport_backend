const mongoose = require("mongoose");

// Define the schema
const bookingRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Use ObjectId for references
        ref: 'User',  // Reference to the User model
        required: true
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,  // Use ObjectId for references
        ref: 'User',  // Reference to the Worker model
        required: true
    },
    services: {
        type:Array
    },
    time: {
        type: String,  // Consider using a Date type if it's a timestamp
    },
    date: {
        type: String,  // Use Date type for date fields
    },
    status: {
        type: String,
        enum: ['pending','request sent', 'confirmed', 'completed', 'canceled'],  // Enumerate possible statuses
        default: 'pending'
    },
    activeStatus:{
        type:Boolean,
        default:true
    },
    otherInfo:{
        type:String,
        default:""
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
},
);

// Create the model from the schema
module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
