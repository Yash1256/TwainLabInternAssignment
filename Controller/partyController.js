const catchAsync = require("../utils/catchAsync");
const partyModel = require("./../models/partyModel");
const userModel = require("./../models/userModel");

exports.protectAccess = catchAsync(async (req, res, next) => {
  // console.log("in", req.body);
  const findParty = await partyModel
    .find({ partyName: req.params.partyName })
    .populate({ path: "leader" });

  if (findParty[0]) {
    req.party = findParty;
    if (req.body.application === "true") return next(); //  to tell protect route to allow this for any user
    if (findParty[0].leader._id != req.user.id) {
      return res.status(404).json({
        status: "fail",
        message: `you are not allowed to perform this action`,
      });
    }
  } else {
    return res.status(404).json({
      status: "fail",
      message: `${req.params.partyName} not exist.`,
    });
  }
  next();
});

exports.registerParty = catchAsync(async (req, res, next) => {
  const newParty = await partyModel.create({
    partyName: req.body.partyName,
    logo: req.body.logo,
    leader: req.user.id,
    headquater: req.body.headquater,
    motive: req.body.motive,
  });
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      role: "polititian",
    },
    {
      runValidators: false,
    }
  );
  res.status(200).json({
    status: "Ok",
    data: {
      newParty,
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

exports.updateParty = catchAsync(async (req, res, next) => {
  // update can only be done by leader
  let filteredBody = filterObj(req.body, "logo", "headquater", "motive");
  if (req.body.leader) {
    const nextLeader = await userModel.find({
      username: req.body.leader,
    });
    if (nextLeader) {
      filteredBody["leader"] = nextLeader[0].id;
    }
  }
  const updatedParty = await partyModel.findByIdAndUpdate(
    req.party[0].id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    status: "Ok",
    data: {
      updatedParty,
    },
  });
});

exports.deleteParty = catchAsync(async (req, res, next) => {
  const deletedParty = await partyModel.findByIdAndDelete(req.party[0].id);
  return res.status(200).json({
    status: "Ok",
    message: `${req.params.partyName} deleted`,
  });
});

exports.getParty = catchAsync(async (req, res, next) => {
  const filteredParty = await partyModel.find(req.query);
  if (filteredParty) {
    return res.status(200).json({
      status: "Ok",
      data: filteredParty,
    });
  }
  res.status(404).json({
    status: "fail",
  });
});

exports.uploadRating = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (req.body.rating < 1 || req.body.rating > 5) {
    return next(new AppError("Invalid Rating Range", 404));
  }
  const updateRating = await partyModel.findById(id);
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
