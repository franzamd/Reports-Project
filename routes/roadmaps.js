const express = require("express");
const {
  getRoadmaps,
  createRoadmap,
  getRoadmap,
  updateRoadmap
} = require("../controllers/roadmap");

const Roadmap = require("../models/Roadmap");

// Middlewares
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Roadmap), getRoadmaps)
  .post(createRoadmap);

router
  .route("/:id")
  .get(getRoadmap)
  .put(updateRoadmap);

module.exports = router;
