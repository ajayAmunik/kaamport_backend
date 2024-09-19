let LabourModel = require("../models/labourModel");
let CategoryModel = require("../models/categoryModel");
let ServicesModel = require("../models/servicesModel")

const createLabour = async (req, res) => {
  try {
    const userId = req.userId.id;
      const {
          firstName, lastName, phoneNumber, age, gender, location, address, photo,
          activeStatus, experience, categoryId, services, otherSkills, availableStartTime,
          availableEndTime, language
      } = req.body;

      
      const existingLabour = await LabourModel.findOne({ phoneNumber });
      if (existingLabour) {
          return res.status(200).json({ responseCode: 400, message: 'Phone number already in use' });
      }

      let findCategory = await CategoryModel.findById(categoryId);
      if (!findCategory) {
          return res.status(200).json({ responseCode: 400, message: 'Category not found' });
      }

      for (let service of services) {
          let existingService = await ServicesModel.findById(service.serviceId);
          if (!existingService) {
              return res.status(200).json({ responseCode: 400, message: `Service with ID ${service.serviceId} not found` });
          }
      }


      const newLabour = new LabourModel({
          userId: userId,
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
          services,
          otherSkills: [], 
          availableStartTime,
          availableEndTime,
          language
      });

      const savedLabour = await newLabour.save();

    
      let otherSkillsArray = [];
      for (let skill of otherSkills) {
          let newSkill = new ServicesModel({
              serviceName: skill.skillName,
              price: skill.price,
              createdBy: savedLabour._id, 
              categoryId: findCategory._id 
          });
          await newSkill.save();
          otherSkillsArray.push({
              skillName: skill.skillName,
              price: skill.price,
              createdBy: savedLabour._id
          });
      }

      savedLabour.otherSkills = otherSkillsArray;
      await savedLabour.save();

      return res.status(200).json({ responseCode: 200, message: 'Labour created successfully', data: savedLabour });
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLabors = async (req, res) => {
  try {
    const labors = await LabourModel.find().populate('services.serviceId').populate('otherSkills.serviceId');
    
    return res.status(200).json({ responseCode: 200, message: 'Labors fetched successfully', data: labors });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const getLabourById = async (req, res) => {
  try {
    const {labourId} = req.body

   
    const labour = await LabourModel.findById(labourId);

    if (!labour) {
      return res.status(200).json({ responseCode: 400, message: 'Labour not found' });
    }

    return res.status(200).json({ responseCode: 200, message: 'Labour details retrieved successfully', data: labour });
  } catch (error) {
    return res.status(500).json({ responseCode: 500, message: 'Server error', error: error.message });
  }
};



const editLabor = async (req, res) => {
  try {
    const { labourId } = req.body;
    const {
      firstName, lastName, phoneNumber, age, gender, location, address, photo,
      activeStatus, experience, categoryId, services, otherSkills, availableStartTime,
      availableEndTime, language
    } = req.body;

    const existingLabour = await LabourModel.findById(labourId);
    if (!existingLabour) {
      return res.status(200).json({ responseCode: 400, message: 'Labor not found' });
    }


    existingLabour.firstName = firstName || existingLabour.firstName;
    existingLabour.lastName = lastName || existingLabour.lastName;
    existingLabour.phoneNumber = phoneNumber || existingLabour.phoneNumber;
    existingLabour.age = age || existingLabour.age;
    existingLabour.gender = gender || existingLabour.gender;
    existingLabour.location = location || existingLabour.location;
    existingLabour.address = address || existingLabour.address;
    existingLabour.photo = photo || existingLabour.photo;
    existingLabour.activeStatus = activeStatus !== undefined ? activeStatus : existingLabour.activeStatus;
    existingLabour.experience = experience || existingLabour.experience;
    existingLabour.categoryId = categoryId || existingLabour.categoryId;
    existingLabour.availableStartTime = availableStartTime || existingLabour.availableStartTime;
    existingLabour.availableEndTime = availableEndTime || existingLabour.availableEndTime;
    existingLabour.language = language || existingLabour.language;

 
    if (services) {
      existingLabour.services = [];
      for (let service of services) {
        let existingService = await ServicesModel.findById(service.serviceId);
        if (!existingService) {
          return res.status(200).json({ responseCode: 400, message: `Service with ID ${service.serviceId} not found` });
        }
        existingLabour.services.push(service);
      }
    }


    if (otherSkills) {
      existingLabour.otherSkills = [];
      for (let skill of otherSkills) {
        let newSkill = new ServicesModel({
          serviceName: skill.skillName,
          price: skill.price,
          createdBy: id, 
          categoryId: existingLabour.categoryId 
        });
        await newSkill.save();
        existingLabour.otherSkills.push({
          skillName: skill.skillName,
          price: skill.price,
          createdBy: id
        });
      }
    }

    const updatedLabour = await existingLabour.save();

    return res.status(200).json({ responseCode: 200, message: 'Labor updated successfully', data: updatedLabour });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


  module.exports ={
    createLabour,
    getLabors,
    editLabor,
    getLabourById

  }