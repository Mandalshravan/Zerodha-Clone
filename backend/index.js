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
const uri = process.env.MONGO_URL;

// ✅ Correct CORS setup - NO trailing slash
app.use(
  cors({
    origin: [
      "https://zerodha-frontend-9dz2.onrender.com",
      "https://zerodha-dashboard-8j1e.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// ✅ API Routes
app.use("/auth", authRoute);
app.use("/order", ordersRoute);
app.use("/holding", holdingsRoute);
app.use("/position", positionsRoute);

// ✅ Optional: Debug test route to confirm server is live
app.get("/", (req, res) => {
  res.send("Zerodha backend is working ✅");
});

// ✅ MongoDB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
