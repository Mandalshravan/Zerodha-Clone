const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.userverification = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) return res.json({ status: false });

    const user = await User.findById(data.id);
    if (user) {
      return res.json({ status: true, user: user.username });
    } else {
      return res.json({ status: false });
    }
  });
};
