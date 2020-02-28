const express = require("express");
const {
  getChauffeurs,
  createChauffeur,
  getChauffeur,
  updateChauffeur
} = require("../controllers/chauffeurs");

const Chauffeur = require("../models/Chauffeur");

// Middlewares
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Chauffeur), getChauffeurs)
  .post(createChauffeur);

router
  .route("/:id")
  .get(getChauffeur)
  .put(updateChauffeur);

module.exports = router;
