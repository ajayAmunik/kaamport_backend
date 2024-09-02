const jwt = require("jsonwebtoken");
let config = require("../config/auth")

let userVerify = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(200).send({
        responseCode:400,
        message: "required token",
      });
    }else{

    let getToken = token.split(" ")[1];
    
    if (!getToken) {
      return res.status(200).send({
        responseCode:400,
        message: "Provide a proper token",
      });
    }else{

    const decode = jwt.verify(getToken, config.secretKey);
    req.userId = { id: decode.id };
    next();
    }
}
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
      error: error,
    });
  }
};

module.exports = { userVerify };