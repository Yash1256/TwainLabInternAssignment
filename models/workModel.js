const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title!"],
  },
  doneBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: [true, "Please provide description!"],
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Work = mongoose.model("Work", WorkSchema);
module.exports = Work;
