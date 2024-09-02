let mongoose = require("mongoose")


let workerSchema = new mongoose.Schema({
    workerId: {
        type:String // Referencing the 'user' collection
    },
    status: {
        type: String,
        default: "true"
    }
});

module.exports = mongoose.model("worker",workerSchema)