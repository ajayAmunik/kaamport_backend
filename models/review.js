let mongoose = require("mongoose")

let review = new mongoose.Schema({
    rating:{
        type:Number
    },
    review:{
        type:String,
        default:""
    },
    fromId:{
        type:String,
        required:true
    },
    toId:{
        type:String,
        required: true
    },
    helpFull:{
        type:Boolean
    }
})

module.exports = mongoose.model("review",review)