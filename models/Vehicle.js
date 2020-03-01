const moongose = require("mongoose");

const VehicleSchema = new moongose.Schema({
  transport: {
    type: String,
    required: [true, "Medio de transporte es requerido"],
    enum: {
      values: ["Camion", "Cisterna", "Tren", "Avion", "Barcaza", "Otro"]
    }
  },
  color: {
    type: String,
    trim: true,
    required: [true, "Color es requerido"],
    maxlength: [20, "Color no debe superar mas de 20 carácteres"]
  },
  number: {
    type: String,
    trim: true,
    required: [true, "Número de placa es requerido"],
    maxlength: [20, "Número de placa  no debe superar mas de 20 carácteres"]
  },
  brand: {
    type: String,
    trim: true,
    required: [true, "Marca es requerido"],
    maxlength: [50, "Marca no debe superar mas de 50 carácteres"]
  },
  volume: {
    type: Number,
    trim: true,
    required: [true, "Volumen es requerido"],
    maxlength: [10, "Volumen no debe superar mas de 10 carácteres"]
  },
  state: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = moongose.model("Vehicle", VehicleSchema);
