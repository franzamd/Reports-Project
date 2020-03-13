const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAuthUser
} = require("../controllers/users");

const User = require("../models/User");

// Middlewares
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser);

router.route("/:id/auth").put(updateAuthUser);

module.exports = router;
