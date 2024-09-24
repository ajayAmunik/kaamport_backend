const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorizationValues = require("../config/auth");
const helper = require("../helper/helper");

const createAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      password,
    } = req.body;

    const existingAdmin = await Admin.findOne({ phoneNumber });
    if (existingAdmin) {
      return res
        .status(200)
        .json({
          responseCode: 400,
          message: "Admin with this phone number already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      password:hashedPassword,
      activeStatus: true,
    });

    await newAdmin.save();

    res
      .status(200)
      .json({
        responseCode: 200,
        message: "Admin created successfully",
        data: newAdmin,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        responseCode:400,
        message: "email and password are required.",
      });
    }

    const existingUser = await Admin.findOne({
      email: email,
    });


    if (!existingUser) {
      return res.status(200).json({
        responseCode:400,
        message: "User not found. Please check your email.",
      });
    }

    if (!existingUser.password) {
      return res.status(200).json({
        responseCode:400,
        message: "Password not set for the user.",
      });
    }

    const comparePassWord = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassWord) {
      return res.status(200).json({
        responseCode:400,
        message: "Invalid password.",
      });
    }

    const tokenId = { id: existingUser.id };
    const userToken = await helper.token(
      tokenId,
      authorizationValues.secreateKey
    );
    existingUser.token = userToken;
    await existingUser.save();

    res.status(200).json({
      responseCode: 200,
      message: "User logged in successfully.",
      user: existingUser,
      token: userToken,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const existingUser = await Admin.findOne({
        email: email,
      });
  
      if (!existingUser) {
        return res.status(200).json({
          message: "User not found. Please contact JPF admin.",
          responseCode: 400,
        });
      }
  
      const temporaryPassword = helper.generateTemporaryPassword();
      console.log(temporaryPassword);
  

      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
  
    
      existingUser.password = hashedPassword;
  

      await existingUser.save();
  
      if (existingUser) {
        helper.sendEmail(existingUser.email, temporaryPassword);
      }
  
      res.status(200).json({
        message: "Temporary password set successfully",
        responseCode: 200,
      });
    } catch (error) {
      console.error("Error in forgot password:", error);
      res.status(500).json({
        message: "Internal Server Error.",
      });
    }
  };



module.exports = {
  createAdmin,
  adminLogin,
  forgotPassword,
  
};
