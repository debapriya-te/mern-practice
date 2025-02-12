const express = require("express");
const {
  getCategory,
  createCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategory);
router.post("/create", createCategory);

module.exports = router;
