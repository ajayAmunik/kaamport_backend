let reportModel = require("../models/report")

let newReport = async(req,res)=>{
    try {
        let {reportType,text}=req.body;

        let newReport = await new reportModel({
            reportType,
            text,
            userId: req.userId.id
        })
        await newReport.save()

        return res.status(200).send({
            message: "new report added",
            data: newReport,
            responseCode: 200
        });
        
    } catch (error) {
        return res.status(500).send({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    newReport
}