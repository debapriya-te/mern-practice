const { mongoose } = require("../db_connection");

const categorySchemea = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  parent_id: {
    type: String,
    ref: "Category",
    default: null,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const Category = mongoose.model("Category", categorySchemea);
module.exports = Category;
