const CategoryModel = require('../models/CategoryModel');

exports.createCategory = async (req, res) => {
  let { category } = req.body;

  try {
    const isCategoryExist = await CategoryModel.findOne({ category });
    if (isCategoryExist !== null) {
      return res
        .status(500)
        .json({ error: 'There is already a category with this name' });
    }
    category = category.charAt(0).toUpperCase() + category.slice(1);

    const newCategory = await new CategoryModel({
      category,
    });
    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createSubcategory = async (req, res) => {
  const { category, subcategory } = req.body;

  try {
    const existingCategory = await CategoryModel.findOne({ category });
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const existingSubCategory = await CategoryModel.findOne({ subcategory });
    if (existingSubCategory !== null) {
      return res
        .status(500)
        .json({ message: 'There is already a subcategory with this name' });
    }

    existingCategory.subcategory.push(subcategory);
    await existingCategory.save();
    res.status(200).json({ message: 'Subcategory created successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create subcategory', error: error.message });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await CategoryModel.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
