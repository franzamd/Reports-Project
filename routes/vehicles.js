const express = require("express");
const {
  getVehicles,
  createVehicle,
  getVehicle,
  updateVehicle,
} = require("../controllers/vehicles");

const Vehicle = require("../models/Vehicle");

// Middlewares
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Use middleware
router.use(protect);
router.use(authorize("administrador", "usuario"));

router
  .route("/")
  .get(
    advancedResults(Vehicle, {
      path: "user",
      select: "_id username",
    }),
    getVehicles
  )
  .post(createVehicle);

router.route("/:id").get(getVehicle).put(updateVehicle);

module.exports = router;
