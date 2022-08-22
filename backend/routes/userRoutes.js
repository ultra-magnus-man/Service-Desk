const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
//Register user route
router.post("/", registerUser);
//Login Route
router.post("/login", loginUser);
//for current user
router.get("/me", protect, getMe);

module.exports = router;
