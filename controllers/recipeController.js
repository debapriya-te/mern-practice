const Recipe = require("../models/recipeModel");

const createRecipe = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title?.trim() || title?.trim()?.lenght < 1) {
      return res.status(400).json({ error: "title is required" });
    }
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(400).json({ error_type: error.name, error: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req?.params;
    let recipe;
    if (id) {
      recipe = await Recipe.findById({ _id: id })
        .populate("user_id", "-password -__v")
        .populate({
          path: "category_ids",
          select: "category_name parent_id",
          populate: {
            path: "parent_id",
            select: "category_name",
          },
        })
        .select("-__v");
    } else {
      recipe = await Recipe.find({})
        .populate({
          path: "category_ids",
          select: "category_name parent_id",
          populate: {
            path: "parent_id",
            select: "category_name",
          },
        })
        .select("-__v")
        // .limit(1)
        .sort({ createdAt: -1 }); //fetch all recipes
      totalCount = await Recipe.countDocuments();
    }
    res
      .status(200)
      .json({ message: "Recipe fetched successfully", recipe, totalCount });
  } catch (error) {
    res.status(400).json({ error_type: error.name, error: error.message });
  }
};

module.exports = {
  createRecipe,
  getRecipe,
};
