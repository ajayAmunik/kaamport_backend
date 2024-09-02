let userModel = require("../models/user")   

let letUserServices = async(req,res)=>{
    try {
        let {userId, services} = req.body;

                    


    } catch (error) {
        res.status(500).send({
            message:"server error",
            error: error.message
        })
    }
}