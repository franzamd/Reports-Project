const express = require("express");
const {
  getVehicles,
  createVehicle,
  getVehicle,
  updateVehicle
} = require("../controllers/vehicles");

const Vehicle = require("../models/Vehicle");

// Middlewares
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Vehicle), getVehicles)
  .post(createVehicle);

router
  .route("/:id")
  .get(getVehicle)
  .put(updateVehicle);

module.exports = router;
