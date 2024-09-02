let mongoose = require("mongoose")

let report = new mongoose.Schema({
    reportType: {
        type:String,
        default: "Other"
    },
    text:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("report",report)