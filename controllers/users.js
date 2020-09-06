const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const User = require("../models/User");

// @desc Get users
// @route GET /api/users
// @access Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get user
// @route GET /api/users/:id
// @access Public∫
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `Usuario con el id ${req.params.id} no ha sido encontrado`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Create a new user
// @route POST /api/users
// @access Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, password2, role } = req.body;

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(
      new ErrorResponse(
        `Email ${req.body.email} ya se encuentra registrado en otro usuario`,
        400
      )
    );
  }

  user = await User.findOne({ username: req.body.username });

  // Verify if password and password2 is equal
  if (password !== password2) {
    return next(new ErrorResponse("Error las contraseñas no son iguales", 400));
  }

  user = await User.create({
    username,
    email,
    password,
    role
  });

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc Update user
// @route PUT /api/user/:id
// @access Public
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`Usuario con el id ${req.params.id} no existe`, 404)
    );
  }

  userFound = await User.findOne({ email: req.body.email });

  // Check if same email or user same id
  if (
    userFound &&
    userFound.email === req.body.email &&
    userFound._id.toString() !== req.params.id
  ) {
    {
      return next(
        new ErrorResponse(
          `Email ingresado con el número ${req.body.email} ya se encuentra registrado con otro usuario`,
          400
        )
      );
    }
  }

  req.body.createdAt = Date.now();

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc Update user
// @route PUT /api/user/:id/auth
// @access Public
exports.updateAuthUser = asyncHandler(async (req, res, next) => {
  const { oldPassword, password } = req.body;

  let user = await User.findById(req.params.id).select("+password");

  if (!user) {
    return next(
      new ErrorResponse(`Usuario con el id ${req.params.id} no existe`, 404)
    );
  }

  // Check if password was input
  if (!oldPassword || !password) {
    return next(
      new ErrorResponse(`Debe ingresar los campos requeridos en password`, 400)
    );
  }

  // Check if password matches
  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    return next(
      new ErrorResponse(
        `Password actual ingresado es incorrecta del usuario`,
        400
      )
    );
  }

  user.password = password;
  user.createdAt = Date.now();

  await user.save();

  res.status(201).json({
    success: true,
    data: user
  });
});
