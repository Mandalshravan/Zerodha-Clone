// routes/AuthRoute.js
const express = require("express");
const router = express.Router();

const { signup, login, logout, verify } = require("../controllers/AuthController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify);

module.exports = router;
