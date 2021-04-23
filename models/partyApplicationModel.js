const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  appliedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  appliedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "Party",
  },
  aadharCardNo: {
    type: String,
    require: true,
    unique: true,
  },
  status: {
    type: Number,
    enum: [-1, 0, 1], //-1 means rejection, 0 means pending and 1 means accepted
    default: 0,
  },
});

const application = mongoose.model("application", applicationSchema);

module.exports = application;
