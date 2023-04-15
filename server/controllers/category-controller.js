const CategoryModel = require("../models/CategoryModel");

exports.createCategory = async (req, res) => {
  const { category } = req.body;

  try {
    const isCategoryExist = await CategoryModel.findOne({ category });
    if (isCategoryExist !== null) {
      return res
        .status(500)
        .json({ error: "There is already a category with this name" });
    }
    const newCategory = await new CategoryModel({
      category,
    });
    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};
exports.createSubcategory = async (req, res) => {
  const { category, subcategory } = req.body;

  try {
    const existingCategory = await CategoryModel.findOne({ category });
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    existingCategory.subcategory.push(subcategory);
    await existingCategory.save();
    res.status(200).json({ message: "Subcategory created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create subcategory", error: error.message });
  }
};
