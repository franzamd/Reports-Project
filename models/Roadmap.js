const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  city: {
    type: String,
    trim: true,
    required: [true, "Ciudad de emisión es requerido"],
    enum: {
      values: [
        "Chuquisaca",
        "Santa Cruz",
        "La Paz",
        "Cochabamba",
        "Oruro",
        "Potosi",
        "Tarija",
        "Beni",
        "Pando"
      ],
      message: "Expedido debe ser seleccionado con una opción válida"
    }
  },
  tramit: {
    type: String,
    trim: true,
    required: [true, "Nº de tramite es requerido"],
    maxlength: [40, "Nº de tramite no debe superar mas de 40 carácteres"]
  },
  products: [
    {
      substance: {
        type: String,
        trim: true
      },
      types: {
        primary: {
          type: String,
          trim: true
        },
        product: {
          type: String,
          trim: true
        },
        percentage: {
          type: String,
          trim: true
        }
      },
      amount: {
        type: Number,
        trim: true
      },
      unit: {
        type: String,
        trim: true
      },
      container: {
        type: {
          type: String,
          trim: true
        },
        amount: {
          type: Number,
          trim: true
        }
      },
      name: {
        type: String,
        trim: true
      }
    }
  ],
  itinerary: {
    origin: {
      address: {
        type: String,
        trim: true,
        required: [true, "Lugar de origen es requerido"],
        maxlength: [80, "Lugar de origen no debe superar mas de 80 carácteres"]
      },
      departament: {
        type: String,
        trim: true,
        required: [true, "Departamento de origen es requerido"],
        maxlength: [
          80,
          "Departamento de origen no debe superar mas de 80 carácteres"
        ]
      },
      province: {
        type: String,
        trim: true,
        required: [true, "Provincia de origen es requerido"],
        maxlength: [
          80,
          "Provincia de origen no debe superar mas de 80 carácteres"
        ]
      },
      municipality: {
        type: String,
        trim: true,
        required: [true, "Municipio de origen es requerido"],
        maxlength: [
          80,
          "Municipio de origen no debe superar mas de 80 carácteres"
        ]
      }
    },
    destination: {
      address: {
        type: String,
        trim: true,
        required: [true, "Lugar de destino es requerido"],
        maxlength: [80, "Lugar de destino no debe superar mas de 80 carácteres"]
      },
      departament: {
        type: String,
        trim: true,
        required: [true, "Departamento de destino es requerido"],
        maxlength: [
          80,
          "Departamento de destino no debe superar mas de 80 carácteres"
        ]
      },
      province: {
        type: String,
        trim: true,
        required: [true, "Provincia de destino es requerido"],
        maxlength: [
          80,
          "Provincia de destino no debe superar mas de 80 carácteres"
        ]
      },
      municipality: {
        type: String,
        trim: true,
        required: [true, "Municipio de destino es requerido"],
        maxlength: [
          80,
          "Municipio de destino no debe superar mas de 80 carácteres"
        ]
      }
    }
  },
  route: {
    type: String,
    trim: true,
    required: [true, "Ruta a seguir es requerido"],
    maxlength: [
      200,
      "Ruta a seguir de destino no debe superar mas de 200 carácteres"
    ]
  },
  validity: {
    type: Number,
    trim: true,
    required: [true, "Validez de dias es requerido"],
    maxlength: [4, "Validez de dias no debe superar mas de 4 cifras"]
  },
  begin: {
    type: Date,
    required: [true, "Fecha de comienzo es requerido"]
  },
  finish: {
    type: Date,
    required: [true, "Fecha de finalización es requerido"]
  },
  authorization: {
    type: String,
    trim: true,
    required: [true, "Autorización comprar local es requerido"],
    maxlength: [
      30,
      "Autorización comprar local no debe superar mas de 30 carácteres"
    ]
  },
  state: {
    type: Boolean,
    default: true
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: "business.managers",
    required: [true, "Responsable es requerido"]
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "business",
    required: [true, "Empresa es requerido"]
  },
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: "vehicle",
    required: [true, "Vehiculo es requerdo"]
  },
  chauffeur: {
    type: mongoose.Schema.ObjectId,
    ref: "chauffeur",
    required: [true, "Chofer es requerido"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Roadmap", RoadmapSchema);
