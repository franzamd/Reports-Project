const express = require("express");
const {
  getChauffeurs,
  createChauffeur,
  getChauffeur,
  updateChauffeur,
} = require("../controllers/chauffeurs");

const Chauffeur = require("../models/Chauffeur");

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
    advancedResults(Chauffeur, {
      path: "user",
      select: "_id username",
    }),
    getChauffeurs
  )
  .post(createChauffeur);

router.route("/:id").get(getChauffeur).put(updateChauffeur);

module.exports = router;
