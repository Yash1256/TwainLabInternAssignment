const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
  },
  logo: {
    type: String,
  },
  leader: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    unique: [true, "you can be leader of one party only!"],
  },
  headquater: {
    type: String,
  },
  motive: {
    type: String,
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

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
