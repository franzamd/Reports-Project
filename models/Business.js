const moongose = require("mongoose");

const BusinessSchema = new moongose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Nombre  es requerido"],
    maxlength: [80, "Nombre no debe superar mas de 80 carácteres"]
  },
  managers: [
    {
      name: {
        type: String,
        trim: true,
        required: [true, "Nombre de Encargado es requerido"],
        maxlength: [
          50,
          "Nombre de Encargado no debe superar mas de 50 carácteres"
        ]
      },
      lastname: {
        type: String,
        trim: true,
        required: [true, "Apellidos de Encargado es requerido"],
        maxlength: [
          30,
          "Apellidos de Encargado no debe superar mas de 30 carácteres"
        ]
      },
      ci: {
        type: String,
        trim: true,
        required: [true, "C.I. de Encargado es requerido"],
        maxlength: [
          15,
          "C.I. de Encargado no debe superar mas de 15 carácteres"
        ]
      },
      role: {
        type: String,
        trim: true,
        required: [true, "Rol de Encargado es requerido"],
        maxlength: [80, "Rol de Encargado no debe superar mas de 80 carácteres"]
      },
      state: {
        type: Boolean,
        required: [true, "Estado de Encargado es requerido"],
        default: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  address: {
    type: String,
    trim: true,
    required: [true, "Dirección es requerido"],
    maxlength: [80, "Dirección no debe superar mas de 80 carácteres"]
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

module.exports = moongose.model("Business", BusinessSchema);
