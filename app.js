require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const reminderRoute = require("./routes/reminderRoutes");

require('./utils/cronJob');

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.use("/api/v1/user", userRoute);
app.use("/api/v1/reminder", reminderRoute);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
