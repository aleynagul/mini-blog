const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
require("./config/redis");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));

// DB connect
connectDB();

module.exports = app;
