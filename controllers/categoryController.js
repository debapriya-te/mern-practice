const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { category_name, image, parent_id, is_active, deleted_at } = req.body;
    if (!category_name?.trim() || category_name?.trim()?.lenght < 1) {
      return res.status(400).json({ error: "category_name is required" });
    }
    const usedCategory = await Category.findOne({
      category_name: category_name.toLowerCase(),
    }).select("-__v");
    if (usedCategory) {
      return res.status(400).json({ error: "Category is already available" });
    }
    const category = await Category.create({
      category_name: category_name.toLowerCase(),
      image,
      parent_id,
      is_active,
      deleted_at,
    });
    res.status(201).json({ category });
  } catch (error) {
    res.status(400).json({ error_type: error.name, error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find({}).select("-__v");
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error_type: error.name, error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategory,
};
