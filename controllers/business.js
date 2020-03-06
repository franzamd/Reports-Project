const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Business = require("../models/Business");

// @desc Get business
// @route GET /api/business
// @access Public
exports.getBusiness = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get business
// @route GET /api/business/:id
// @access Public
exports.getBusinessById = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    return next(
      new ErrorResponse(
        `Empresa con el id ${req.params.id} no ha sido encontrado`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: business
  });
});

// @desc Get managers
// @route POST /api/business/:id/managers
// @access Public
exports.getManagers = asyncHandler(async (req, res, next) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    return next(
      new ErrorResponse(
        `Empresa con el id ${req.params.id} no ha sido encontrado`
      )
    );
  }

  res.status(201).json({
    success: true,
    data: business.managers
  });
});

// @desc Create a new business
// @route POST /api/business
// @access Public
exports.createBusiness = asyncHandler(async (req, res, next) => {
  let business = await Business.findOne({ name: req.body.name });

  if (business) {
    return next(
      new ErrorResponse(
        `Nombre ${req.body.name} ya se encuentra registrado en otra empresa`
      )
    );
  }

  business = await Business.create(req.body);

  res.status(201).json({
    success: true,
    data: business
  });
});

// @desc Create a new manager by business
// @route POST /api/business/:id/managers
// @access Public
exports.createManager = asyncHandler(async (req, res, next) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    return next(
      new ErrorResponse(
        `Empresa con el id ${req.params.id} no ha sido encontrado`
      )
    );
  }

  let error;

  // Check if same ci with other manager
  business.managers.map(manager => {
    if (manager.ci === req.body.ci) {
      return (error = true);
    }
  });

  if (error) {
    return next(
      new ErrorResponse(
        `El C.I. ingresado ${req.body.ci} ya se encuentra registrado con otro encargado`,
        400
      )
    );
  }

  business.managers.push(req.body);

  await business.save();

  res.status(201).json({
    success: true,
    data: business
  });
});

// @desc Update manager's data by business
// @route PUT /api/business/:id/managers/:managerId
// @access Public
exports.updateManager = asyncHandler(async (req, res, next) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    return next(
      new ErrorResponse(
        `Empresa con el id ${req.params.id} no ha sido encontrado`
      )
    );
  }

  if (!business.managers.length > 0) {
    return next(
      new ErrorResponse(`Empresa no tiene encargados por actualizar`)
    );
  }

  let error;

  // Check if same ci with other manager
  business.managers.map(manager => {
    if (
      manager.ci === req.body.ci &&
      manager._id.toString() !== req.params.managerId
    ) {
      return (error = true);
    }
  });

  if (error) {
    return next(
      new ErrorResponse(
        `El C.I. ingresado ${req.body.ci} ya se encuentra registrado con otro encargado`,
        400
      )
    );
  }

  business.managers.map(manager => {
    if (manager._id.toString() === req.params.managerId) {
      manager._id = manager._id;
      manager.name = req.body.name;
      manager.lastname = req.body.lastname;
      manager.ci = req.body.ci;
      manager.role = req.body.role;
      manager.state = req.body.state;
      manager.createdAt = Date.now();
    }
  });

  await business.save();

  res.status(201).json({
    success: true,
    data: business
  });
});

// @desc Update business
// @route PUT /api/business/:id
// @access Public
exports.updateBusiness = asyncHandler(async (req, res, next) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    return next(
      new ErrorResponse(`Empresa con el id ${req.params.id} no existe`)
    );
  }

  business = await Business.findOne({ name: req.body.name });

  // Check if same name or business same id
  if (
    business &&
    business.name === req.body.name &&
    business._id.toString() !== req.params.id
  ) {
    {
      return next(
        new ErrorResponse(
          `El Nombre ingresado ${req.body.ci} ya se encuentra registrado con otro encargado`,
          400
        )
      );
    }
  }

  req.body.createdAt = Date.now();

  business = await Business.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });

  res.status(201).json({
    success: true,
    data: business
  });
});
