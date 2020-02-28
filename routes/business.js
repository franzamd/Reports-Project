const express = require("express");
const {
  getBusiness,
  getBusinessById,
  getManagers,
  createBusiness,
  createManager,
  updateManager,
  updateBusiness
} = require("../controllers/business");

const Business = require("../models/Business");

// Middlewares
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Business), getBusiness)
  .post(createBusiness);

router
  .route("/:id")
  .get(getBusinessById)
  .put(updateBusiness);

router
  .route("/:id/managers")
  .get(getManagers)
  .post(createManager);

router.route("/:id/managers/:managerId").put(updateManager);

module.exports = router;
