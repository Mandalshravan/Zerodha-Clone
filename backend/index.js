require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/AuthRoute");
const ordersRoute = require("./routes/OrderRoute");
const holdingsRoute = require("./routes/HoldingRoute");
const positionsRoute = require("./routes/PositionRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://zerodha-frontend-9dz2.onrender.com",
      "https://zerodha-dashboard-8j1e.onrender.com",
      "http://localhost:5173", // optional for local test
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Correct route prefix
app.use("/api/auth", authRoute);
app.use("/order", ordersRoute);
app.use("/holding", holdingsRoute);
app.use("/position", positionsRoute);

app.get("/", (req, res) => {
  res.send("Zerodha backend is working ✅");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server is running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
