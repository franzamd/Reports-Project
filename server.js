const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("colors");

// Load env variables global
dotenv.config({ path: "./config/config.env" });

const app = express();

// Connect DB
connectDB();

// Body Parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold
  );
});
