const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// @desc Register user
// @route POST /api/auth/register
// Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, password2 } = req.body;

  let user;

  // Verify if user exist
  user = await User.findOne({ email });

  if (user) {
    return next(
      new ErrorResponse("Ya existe un usuario con el email registrado", 400)
    );
  }

  // Verify if password and password2 is equal
  if (password !== password2) {
    return next(new ErrorResponse("Error las contraseñas no son iguales", 400));
  }

  // Create user
  user = await User.create({
    username,
    email,
    password
  });

  sendTokenResponse(user, 200, res);
});

// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(
      new ErrorResponse(`Por favor ingresa un email y contraseña`, 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  // Check of user
  if (!user) return next(new ErrorResponse("Credenciales inválidas", 401));

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Credenciales inválidas", 401));

  // Check if user is not blocked
  if (!user.state) {
    return next(
      new ErrorResponse(
        "Lo sentimos pero el usuario se encuentra sin acceso",
        403
      )
    );
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    data: user
  });
});

// @desc    Log user out & clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

const sendTokenResponse = (user, statusCode, res) => {
  // Create Token
  const token = user.getSinedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = false;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
