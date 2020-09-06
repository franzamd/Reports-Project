const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Ingrese un username"],
    maxlength: [10, "Username no debe ser superar los 10 caracteres"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Ingrese un email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Ingresa un email válido",
    ],
  },
  role: {
    type: String,
    default: "usuario",
    enum: {
      values: ["administrador", "usuario"],
      message: "Rol debe ser selccionado con una opción válida",
    },
  },
  password: {
    type: String,
    required: [true, "Ingrese un password"],
    trim: true,
    minlength: [6, "Password debe ser 6 o mas caracteres"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  state: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password with bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSinedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token with crypto
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
