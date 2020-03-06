const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Roadmap = require("../models/Roadmap");

// @desc Get roadmaps
// @route GET /api/roadmaps
// @access Public
exports.getRoadmaps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get roadmaps
// @route GET /api/roadmaps/:id
// @access Public
exports.getRoadmap = asyncHandler(async (req, res, next) => {
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

// @desc Create a new roadmap
// @route POST /api/roadmaps
// @access Public
exports.createRoadmap = asyncHandler(async (req, res, next) => {
  const roadmap = await Roadmap.create(req.body);

  res.status(201).json({
    success: true,
    data: roadmap
  });
});

// @desc Update roadmap
// @route PUT /api/roadmaps/:id
// @access Public
exports.updateRoadmap = asyncHandler(async (req, res, next) => {
  req.body.createdAt = Date.now();

  const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });

  res.status(201).json({
    success: true,
    data: roadmap
  });
});
