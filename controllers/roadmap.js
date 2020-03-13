const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Roadmap = require("../models/Roadmap");
const Chauffeur = require("../models/Chauffeur");
const Business = require("../models/Business");
const Vehicle = require("../models/Vehicle");

// @desc Get roadmaps
// @route GET /api/roadmaps
// @access Public
exports.getRoadmaps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get roadmap data with populate models
// @route GET /api/roadmap/:id/all
// @access Public
exports.getRoadmapByPopulate = asyncHandler(async (req, res, next) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (!roadmap) {
    return next(
      new ErrorResponse(
        `Hoja de Ruta con el id ${req.params.id} no ha sido encontrado`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: roadmap
  });
});

// @desc Get roadmaps
// @route GET /api/roadmaps/:id
// @access Public
exports.getRoadmap = asyncHandler(async (req, res, next) => {
  const roadmap = await Roadmap.findById(req.params.id).populate([
    {
      path: "chauffeur",
      select: "name ci lastname license",
      model: Chauffeur
    },
    {
      path: "vehicle",
      select: "number brand color volume transport",
      model: Vehicle
    },
    {
      path: "business",
      select: "name nit managers",
      model: Business
    }
  ]);

  if (!roadmap) {
    return next(
      new ErrorResponse(
        `Hoja de Ruta con el id ${req.params.id} no ha sido encontrado`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: roadmap
  });
});

// @desc Create a new roadmap
// @route POST /api/roadmaps
// @access Public
exports.createRoadmap = asyncHandler(async (req, res, next) => {
  let roadmap = await Roadmap.findOne({ tramit: req.body.tramit });

  if (roadmap) {
    return next(
      new ErrorResponse(
        `Nº de tramite ${req.body.tramit} ya se encuentra registrado en otra hoja de ruta`,
        400
      )
    );
  }

  roadmap = await Roadmap.create(req.body);

  res.status(201).json({
    success: true,
    data: roadmap
  });
});

// @desc Update roadmap
// @route PUT /api/roadmaps/:id
// @access Public
exports.updateRoadmap = asyncHandler(async (req, res, next) => {
  let roadmap = await Roadmap.findById(req.params.id);

  if (!roadmap) {
    return next(
      new ErrorResponse(
        `Hoja de ruta con el id ${req.params.id} no existe`,
        404
      )
    );
  }

  roadmap = await Roadmap.findOne({ tramit: req.body.tramit });

  // Check if same tramit or roadmap same tramit
  if (
    roadmap &&
    roadmap.tramit === req.body.tramit &&
    roadmap._id.toString() !== req.params.id
  ) {
    {
      return next(
        new ErrorResponse(
          `Nº de Tramite con el id ${req.body.tramit} ya se encuentra registrado con otra hoja de ruta`,
          400
        )
      );
    }
  }

  req.body.createdAt = Date.now();

  roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });

  res.status(201).json({
    success: true,
    data: roadmap
  });
});
