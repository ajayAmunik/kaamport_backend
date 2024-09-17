let LabourModel = require("../models/labourModel")

const createLabour = async (req, res) => {
    try {
      // Extract data from request body
      const {
        userId, firstName, lastName, phoneNumber, age, gender, location, address, photo,
        activeStatus, experience, categoryId, skills, otherSkills, availableStartTime,
        availableEndTime, language
      } = req.body;
  
      // Check if the phone number already exists (ensure unique phone number)
      const existingLabour = await Labour.findOne({ phoneNumber });
      if (existingLabour) {
        return res.status(400).json({ message: 'Phone number already in use' });
      }
  
      // Create new labour entry
      const newLabour = new Labour({
        userId,
        firstName,
        lastName,
        phoneNumber,
        age,
        gender,
        location,
        address,
        photo,
        activeStatus,
        experience,
        categoryId,
        skills,
        otherSkills,
        availableStartTime,
        availableEndTime,
        language
      });
  
      // Save the labour record to the database
      const savedLabour = await newLabour.save();
  
      return res.status(201).json({ message: 'Labour created successfully', data: savedLabour });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  module.exports ={
    createLabour
  }