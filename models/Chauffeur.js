const mongoose = require("mongoose");

const ChauffeurSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Nombres es requerido"],
    maxlength: [30, "Nombres no debe superar mas de 30 carácteres"],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, "Apellidos es requerido"],
    maxlength: [30, "Apellidos no debe superar mas de 30 carácteres"],
  },
  ci: {
    type: String,
    trim: true,
    required: [true, "C.I. es requerido"],
    maxlength: [15, "C.I. no debe superar mas de 15 carácteres"],
  },
  issued: {
    type: String,
    trim: true,
    required: [true, "Expedido es requerido"],
    enum: {
      values: ["CH", "LP", "CB", "OR", "PO", "TJ", "SC", "BE", "PA"],
      message: "Expedido debe ser seleccionado con una opción válida",
    },
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Domicilio es requerido"],
    maxlength: [80, "Domicilio no debe superar mas de 80 carácteres"],
  },
  license: {
    type: Number,
    trim: true,
    required: [true, "Licencia es requerido"],
    maxlength: [30, "Licencia no debe superar mas de 30 carácteres"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Usuario es requerido"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chauffeur", ChauffeurSchema);
