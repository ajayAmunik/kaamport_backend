let mongoose = require("mongoose")

let bookingImage = new mongoose.Schema({
    images:{
        type:Array
    },
    userId:{
        type:String
    },
    bookingRequestId:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("bookingImage",bookingImage)