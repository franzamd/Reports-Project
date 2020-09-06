const express = require("express");
const {
  getBusiness,
  getBusinessById,
  getManagers,
  createBusiness,
  createManager,
  updateManager,
  updateBusiness,
} = require("../controllers/business");

const Business = require("../models/Business");

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
    advancedResults(Business, {
      path: "user",
      select: "_id username",
    }),
    getBusiness
  )
  .post(createBusiness);

router.route("/:id").get(getBusinessById).put(updateBusiness);

router.route("/:id/managers").get(getManagers).post(createManager);

router.route("/:id/managers/:managerId").put(updateManager);

module.exports = router;
