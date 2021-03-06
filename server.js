const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const open = require("open"); // Opens the image in the default image viewer
require("colors");

// Load env variables global
dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();

const app = express();

// Routes files
const auth = require("./routes/auth.js");
const users = require("./routes/users.js");
const chauffeurs = require("./routes/chauffeurs.js");
const vehicles = require("./routes/vehicles.js");
const business = require("./routes/business.js");
const roadmaps = require("./routes/roadmaps.js");

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/chauffeurs", chauffeurs);
app.use("/api/vehicles", vehicles);
app.use("/api/business", business);
app.use("/api/roadmaps", roadmaps);

// Handle errors
app.use(errorHandler);

// Protect routes if 404 response via server port
app.get("*", function (req, res) {
  res.redirect("/");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold
  );

  if (process.env.NODE_ENV === "production") {
    // Opens the image in the default image viewer
    (async () => {
      // Opens the url in the default browser
      await open("http://localhost:5000");

      // Specify the app to open in
      await open("http://localhost:5000", { app: "firefox" });

      // Specify app arguments
      await open("http://localhost:5000", {
        app: ["google chrome", "--incognito"],
      });
    })();
  }
});
