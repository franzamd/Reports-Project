const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Vehicle = require("../models/Vehicle");

// @desc Get vehicles
// @route GET /api/vehicles
// @access Public
exports.getVehicles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get vehicle
// @route GET /api/vehicles/:id
// @access Public
exports.getVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehiculo con el id ${req.params.id} no ha sido encontrado`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: vehicle
  });
});

// @desc Create a new vehicle
// @route POST /api/vehicles
// @access Public
exports.createVehicle = asyncHandler(async (req, res, next) => {
  let vehicle = await Vehicle.findOne({ number: req.body.number });

  if (vehicle) {
    return next(
      new ErrorResponse(
        `Nombre ${req.body.number} ya se encuentra registrado en otro vehiculo`
      )
    );
  }

  vehicle = await Vehicle.create(req.body);

  res.status(201).json({
    success: true,
    data: vehicle
  });
});

// @desc Update vehicle
// @route PUT /api/vehicle/:id
// @access Public
exports.updateVehicle = asyncHandler(async (req, res, next) => {
  let vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehiculo con el id ${req.params.id} no existe`)
    );
  }

  vehicle = await Vehicle.findOne({ ci: req.body.ci });

  // Check if same number or vehicle same id
  if (
    vehicle &&
    vehicle.number === req.body.number &&
    vehicle._id.toString() !== req.params.id
  ) {
    {
      return next(
        new ErrorResponse(
          `Placa ingresado con el número ${req.body.number} ya se encuentra registrado con otro vehiculo`,
          400
        )
      );
    }
  }

  req.body.createdAt = Date.now();
  vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });

  res.status(201).json({
    success: true,
    data: vehicle
  });
});
