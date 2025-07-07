const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// ✅ Do NOT call the function with (), just pass the function reference
router.post("/signup", authController.signup); // ✅
router.post("/login", authController.login);   // ✅
router.get("/verify", authController.verify);  // ✅

module.exports = router;
