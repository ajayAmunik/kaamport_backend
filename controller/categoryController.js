const CategoryModel = require("../models/categoryModel")
const UserModel = require("../models/user")


const createCategory = async (req, res) => {
    try {
      const userId = req.userId.id; // category should be created by admin only. later change to admin id
      const { category, description } = req.body;

      if (!category) {
        return res.status(200).json({responseCode:400, message: "Category name is required" });
      }
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(200).json({ responseCode: 400, message: "user not found" });
      }
  
      const existingCategory = await CategoryModel.findOne({ 
        category: { $regex: `^${category}$`, $options: 'i' }, 
        createdBy: userId 
      });
      if (existingCategory) {
        return res.status(200).json({ responseCode: 400, message: "Category already exists" });
      }
      
      const newCategory = new CategoryModel({ 
        category: category,
        description: description,
        createdBy: userId
      });

      await newCategory.save();
  
      res.status(200).json({
        responseCode: 200,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Server error" });
    }
};

const editCategory = async (req, res) => {
    try {
      const userId = req.userId.id;
      const { categoryId, newCategory, newDescription } = req.body;
  
      if (!categoryId || !newCategory) {
        return res.status(200).json({ responseCode: 400, message: "Category ID and new name are required" });
      }
  
      const category = await CategoryModel.findOne({ _id: categoryId, createdBy: userId });
      if (!category) {
        return res.status(200).json({ responseCode: 400, message: "Category not found" });
      }

      const existingCategory = await CategoryModel.findOne({
        _id: { $ne: categoryId },
        category: { $regex: `^${newCategory}$`, $options: 'i' },
        createdBy: userId
      });
  
      if (existingCategory) {
        return res.status(400).json({ responseCode: 400, message: "A category with the same name already exists" });
      }
  
      category.category = newCategory;
      category.description = newDescription;
  
      await category.save();
  
      return res.status(200).json({
        responseCode: 200,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      console.log("Error in edit category API:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// list of Category
const listOfAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({})
    if (category.length === 0) {
      return res.status(200).json({
        responseCode: 400,
        message: "No category found"
      });
    }

    return res.status(200).json({
      responseCode:200,
      message: "Category list fetched successfully", 
      data: category
    })

  } catch (error) {
    console.log("Error in getListOfAllCategory api", error)
    return res.status(500).json({message: " server error "})
  }
}

//get category by Id
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.body
    if(!categoryId){
      return res.status(200).json({
        responseCode: 400,
        message: "Please provide valid categoryId"
      })
    }

    const category = await CategoryModel.findById({_id: categoryId})
    if(!category) {
      return res.status(200).json({
        responseCode: 400,
        message: "category doesnot exists"
      })
    }

    return res.status(200).json({
      responseCode: 200, 
      message: "Retrieved category by Id", 
      data: category
    })

  } catch (error) {
    console.log("Error in getCategoryById api", error)
    return res.status(500).json({message: "server error"})
  }
}

const toggleCategory = async (req, res) => {
    try {
      const userId = req.userId.id;
      const { categoryId, status } = req.body;
  
      if (!categoryId || !["active", "inactive"].includes(status)) {
        return res.status(200).json({
          responseCode: 400,
          message: "Category ID and valid status are required",
        });
      }
  
      const category = await CategoryModel.findOne({ _id: categoryId, createdBy: userId });
      if (!category) {
        return res.status(200).json({
          responseCode: 400,
          message: "Category not found. Provide a valid categoryId",
        });
      }
  
      category.status = status;
  
      await category.save();
  
      return res.status(200).json({
        responseCode: 200,
        message: `Category status changed to ${status} successfully`,
        data: category,
      });
    } catch (error) {
      console.log("Error in toggle category API:", error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  

module.exports = {
    createCategory,
    editCategory,
    listOfAllCategory,
    getCategoryById,
    toggleCategory,
}