const express = require("express");
const {
  getRoadmaps,
  getRoadmapByPopulate,
  createRoadmap,
  getRoadmap,
  updateRoadmap
} = require("../controllers/roadmap");

const Roadmap = require("../models/Roadmap");
const Chauffeur = require("../models/Chauffeur");
const Business = require("../models/Business");
const Vehicle = require("../models/Vehicle");

// Middlewares
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(Roadmap, [
      {
        path: "chauffeur",
        select: "name lastname",
        model: Chauffeur
      },
      {
        path: "business",
        select: "name",
        model: Business
      },
      {
        path: "vehicle",
        select: "number",
        model: Vehicle
      }
    ]),
    getRoadmaps
  )
  .post(createRoadmap);

router.route("/:id/all").get(getRoadmapByPopulate);

router
  .route("/:id")
  .get(getRoadmap)
  .put(updateRoadmap);

module.exports = router;
