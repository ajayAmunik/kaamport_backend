const ServicesModel = require("../models/servicesModel")

const createServices = async (req, res) => {
    try {
        const userId = req.userId.id
      const { services, categoryId } = req.body;
  
      if (!services || !categoryId) {
        return res.status(200).json({responseCode: 400, message: 'services and categoryId are required' });
      }

      const existingServices = await ServicesModel.findOne({services,createdBy: userId});
      if(existingServices){
        return res.status(200).json({responseCode:400, message: "services already exists"})
      }
      const newServices = new ServicesModel({
        services,
        categoryId,
        createdBy: userId,
        created_At: Date.now()
      });
  
      await newServices.save();
  
      res.status(200).json({responseCode: 200, message: 'services added successfully', data: newServices });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };


  const getAllServices = async (req, res) => {
    try {
      const allServices = await ServicesModel.find();
  
      if (!allServices || allServices.length === 0) {
        return res.status(200).json({
          responseCode: 400, 
          message: 'No services found'
        });
      }
  
      res.status(200).json({
        responseCode: 200, 
        message: 'services retrieved successfully', 
        data: allServices 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  



  const getServicesByServiceId = async (req, res) => {
    try {
      const { serviceId } = req.body;
  
      if (!serviceId) {
        return res.status(200).json({
          responseCode: 400, 
          message: 'serviceId is required' 
        });
      }
  
      const services = await ServicesModel.findById(serviceId);
  
      if (!services) {
        return res.status(200).json({
          responseCode: 400, 
          message: 'services not found' 
        });
      }
  
      res.status(200).json({
        responseCode:200, 
        message: 'services retrieved successfully', 
        data: services 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
const getServicesByCategoryId = async (req, res) => {
  try {
    const { categoryId} = req.body
    
  } catch (error) {
    
  }
}


  const editServices = async (req, res) => {
    try {
        const userId = req.userId.id;
      const { serviceId, newServices, categoryId } = req.body;
  
      if (!serviceId || !newServices || !categoryId) {
        return res.status(200).json({
          responseCode: 400, 
          message: 'All fields are required' 
        });
      }
  
      const existingServices = await ServicesModel.findOne({
        _id: serviceId,
        createdBy: userId
      });

      if (!existingServices) {
        return res.status(200).json({
          responseCode: 400, 
          message: 'service not found' 
        });
      }
  
      existingServices.services = newServices;
      existingServices.categoryId = categoryId;
      existingServices.updated_At = Date.now();

      await existingServices.save();
  
      res.status(200).json({
        responseCode: 200, 
        message: 'Services updated successfully', 
        data: existingServices 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };  
 
  
  module.exports = {createServices, getAllServices, getServicesByServiceId, editServices};