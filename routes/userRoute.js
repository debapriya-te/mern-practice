const express = require("express");
const {
  register,
  login,
  userInfo,
  updateUser,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const apiRateLimiter = require("../middleware/rateLimit");

const router = express.Router();

router.post("/login", apiRateLimiter(1 * 60 * 1000, 5), login);
router.post("/register", apiRateLimiter(), register);
router.get("/userInfo", requireAuth, userInfo);
router.patch("/updateUser", requireAuth, apiRateLimiter(), updateUser);

module.exports = router;
