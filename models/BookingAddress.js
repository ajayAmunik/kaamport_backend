const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    latitude: {
        type:Number,
    },
    longitude: {
        type:Number,
        
    },
    location: {
        type: String,
    },
    bookingRequestId:{
        type:String,
        required:[true, "booking request id is require"]
    },
    activeStatus:{
        type:Boolean,
        default:true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);
