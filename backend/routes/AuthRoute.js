const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/AuthController");
const { userverification } = require("../middlewares/Authmiddleware");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", userverification);

module.exports = router;
