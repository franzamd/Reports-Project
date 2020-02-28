const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Chauffeur = require("../models/Chauffeur");

// @desc Get chauffeurs
// @route GET /api/chauffeurs
// @access Public
exports.getChauffeurs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get chauffeur
// @route GET /api/chauffeurs/id
// @access Public
exports.getChauffeur = asyncHandler(async (req, res, next) => {
  const chauffeur = await Chauffeur.findById(req.params.id);

  if (!chauffeur) {
    return next(
      new ErrorResponse(
        `Chofer con el id ${req.params.id} no ha sido encontrado`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: chauffeur
  });
});

// @desc Create a new chauffeur
// @route POST /api/chauffeurs
// @access Public
exports.createChauffeur = asyncHandler(async (req, res, next) => {
  let chauffeur = await Chauffeur.findOne({ci: req.body.ci });

  if(chauffeur) {
    return next(new ErrorResponse(`C.I. ${req.body.ci} ya se encuentra registrado en otro chofer`))
  }
 
   chauffeur = await Chauffeur.create(req.body);

  res.status(201).json({
    success: true,
    data: chauffeur
  });
});

// @desc Update chauffeur
// @route PUT /api/chauffeur/:id
// @access Public
exports.updateChauffeur = asyncHandler(async (req, res, next) => {
  let chauffeur = await Chauffeur.findById(req.params.id);

  if (!chauffeur) {
    return next(
      new ErrorResponse(`Chofer con el id ${req.params.id} no existe`)
    );
  }

  chauffeur = await Chauffeur.findOne({ ci: req.body.ci });

  // Check if same ci or chauffeur same id
  if (
    chauffeur &&
    chauffeur.ci === req.body.ci &&
    chauffeur._id.toString() !== req.params.id
  ) {
    {
      return next(
        new ErrorResponse(
          `El C.I. ingresado ${req.body.ci} ya se encuentra registrado con otro chofer`,
          400
        )
      );
    }
  }

  req.body.createdAt = Date.now();
  chauffeur = await Chauffeur.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });

  res.status(201).json({
    success: true,
    data: chauffeur
  });
});
