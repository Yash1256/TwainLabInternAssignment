const userModel = require("../models/userModel");
const partyModel = require("../models/partyModel");
const catchAsync = require("./../utils/catchAsync");
const partyAppModel = require("../models/partyApplicationModel");
const AppError = require("./../utils/appError");

exports.filteredUser = catchAsync(async (req, res, next) => {
  const filteredUser = await userModel.find(req.query);
  if (filteredUser) {
    return res.status(200).json({
      status: "Ok",
      data: filteredUser,
    });
  }
  res.status(404).json({
    status: "fail",
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Ok",
    data: {
      loggedInUser: req.user,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "address", "phoneNumber", "email");
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Ok",
    data: {
      updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const deletedUser = await userModel.findByIdAndDelete(req.user.id);
  //   after deleted user should be logged out
  next();
});

// user can leave party if he/she belong to any
exports.leaveParty = catchAsync(async (req, res, next) => {
  console.log("leaved Party");
  res.status(200).json({
    status: "Ok",
  });
});

exports.allAppliedApplications = catchAsync(async (req, res, next) => {
  // console.log(req.user.id);
  var allAPP;
  if (req.query.status) {
    var x = req.query.status;
    if (x != 1 && x != 0 && x != -1) {
      return next(new AppError("Status can be either 0, 1, -1."));
    }
    allAPP = await partyAppModel.find({
      appliedBy: req.user.id,
      status: req.query.status,
    });
  } else {
    allAPP = await partyAppModel.find({
      appliedBy: req.user.id,
    });
  }
  res.status(200).json({
    status: "Ok",
    data: {
      allAPP,
    },
  });
});

exports.uploadRating = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (req.body.rating < 1 || req.body.rating > 5) {
    return next(new AppError("Invalid Rating Range", 404));
  }
  const updateRating = await userModel.findById(id);
  if (updateRating.role === "user") {
    return next(new AppError("A User Can't be rated, only Polititian can be rated", 404));
  }
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

exports.userAcceptApplication = catchAsync(async (req, res, next) => {
  const acceptAppId = req.params.id;
  const application = await partyAppModel
    .findById(acceptAppId)
    .populate({ path: "appliedTo" });
  if (!application) {
    return next(new AppError("Application doesnot exists!", 404));
  }
  if (application.status != 1) {
    return next(new AppError("Your Application is not Accepted Yet", 404));
  }
  if (req.user.id != application.appliedBy) {
    return next(
      new AppError("You are not authorized to perform this action", 404)
    );
  }
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { userParty: application.appliedTo._id, role: "Polititian" },
    {
      runValidators: false,
    }
  );
  // console.log(application);
  const delApp = await partyAppModel.deleteMany({ appliedBy: req.user.id });
  res.status(200).json({
    status: "ok",
    data: {
      user,
    },
  });
});
