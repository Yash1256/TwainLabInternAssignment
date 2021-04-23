const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const partyAppModel = require("./../models/partyApplicationModel");

exports.applyInParty = catchAsync(async (req, res, next) => {
  const checkForExistingApp = await partyAppModel.find({
    appliedBy: req.user.id,
    appliedTo: req.party[0].id,
  });
  if (checkForExistingApp[0]) {
    return res.status(400).json({
      status: "fail",
      message: `you have already applied to ${req.params.partyName}`,
    });
  }
  const newAppCreated = await partyAppModel.create({
    appliedBy: req.user.id,
    appliedTo: req.party[0].id,
    aadharCardNo: req.body.aadharCardNo,
  });
  res.status(200).json({
    status: "Ok",
    data: {
      newAppCreated,
    },
  });
});

exports.acceptApplication = catchAsync(async (req, res, next) => {
  const app_id = req.params.app_id;
  var x = req.body.status;
  if (x != 0 && x != 1 && x != -1) {
    return next(
      new AppError(`Status can't be ${x}, It can be either 0, -1, 1`)
    );
  }
  const application = await partyAppModel.findById(app_id);
  if (!application) {
    return next(new AppError("No Application found with that id", 404));
  }
  if (req.party[0].id != application.appliedTo) {
    return next(new AppError("You can't Alter the Application", 404));
  }
  application.status = req.body.status;
  application.save();
  res.status(200).json({
    status: "ok",
    data: {
      application,
    },
  });
});

exports.filterApplication = catchAsync(async (req, res, next) => {
  const filterApplication = await partyAppModel.find(req.query);
  // console.log(filterApplication);
  res.status(200).json({
    status: "Ok",
    data: {
      filterApplication,
    },
  });
});
