const workModel = require("./../models/workModel");
const userModel = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.newWork = catchAsync(async (req, res, next) => {
  if (req.user.role == "user") {
    return res.status(401).json({
      status: "Fail",
      message: "User can't add the work",
    });
  }
  const Work = await workModel.create({
    title: req.body.title,
    doneBy: req.user.id,
    description: req.body.description,
  });
  res.status(200).json({
    status: "Ok",
    data: {
      Work,
    },
  });
});

exports.uploadRating = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (req.body.rating < 1 || req.body.rating > 5) {
    return next(new AppError("Invalid Rating Range", 404));
  }
  const updateRating = await workModel.findById(id);
  if (!updateRating) {
    return next(new AppError("No document found with that ID", 404));
  }
  let x = updateRating.rating * updateRating.ratingCount;
  x += req.body.rating;
  updateRating.ratingCount += 1;
  updateRating.rating = x / updateRating.ratingCount;
  updateRating.save();
  res.status(200).json({
    status: "OK",
    data: {
      updateRating,
    },
  });
});
