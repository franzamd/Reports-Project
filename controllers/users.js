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
  //   let user = await User.findOne({ email: req.body.email });
  //   if (user) {
  //     return next(
  //       new ErrorResponse(
  //         `Nombre ${req.body.email} ya se encuentra registrado en otro usuario`
  //       )
  //     );
  //   }
  //   user = await User.create(req.body);
  //   res.status(201).json({
  //     success: true,
  //     data: user
  //   });
});

// @desc Update user
// @route PUT /api/user/:id
// @access Public
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`Usuario con el id ${req.params.id} no existe`)
    );
  }

  user = await User.findOne({ ci: req.body.ci });

  // Check if same email or user same id
  if (
    user &&
    user.email === req.body.email &&
    user._id.toString() !== req.params.id
  ) {
    {
      return next(
        new ErrorResponse(
          `Placa ingresado con el número ${req.body.email} ya se encuentra registrado con otro usuario`,
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
