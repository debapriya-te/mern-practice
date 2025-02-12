const { mongoose } = require("../db_connection");

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    category_ids: {
      type: [mongoose.Schema.Types.ObjectId], // Assuming categories are stored as an array of strings
      ref: "Category",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // References a user in the 'users' collection
      ref: "User",
      required: true,
    },
    expiration_date: {
      type: Date,
      default: null,
    },
    is_highlight: {
      type: Boolean,
      default: false,
    },
    thumbnail_image: {
      type: String,
      required: true,
    },
    is_comments_allowed: {
      type: Boolean,
      default: true,
    },
    pdf_attachment: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
    is_premium: {
      type: Boolean,
      default: true,
    },
    free_preview_elements: {
      type: Number,
      default: 0,
    },
    publish_status: {
      type: String,
      enum: ["save_and_publish", "save_as_draft", "scheduled"],
      default: "save_and_publish",
    },
    publish_scheduled_datetime: {
      type: Date,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Auto-manage created_at and updated_at
  }
);

RecipeSchema.index({ title: 1 }); // Adding index for the 'title' field

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
