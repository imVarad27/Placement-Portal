const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  prn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cgpa: { type: Number, required: true },
  stream: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isselected: { type: Boolean, required: true },
  kt: { type: Boolean, required: true },
  batch: { type: Number, required: true },
  ssc: { type: Number, required: true },
  hsc: { type: Number, required: true },
  backlogs: { type: Number, required: true },
  livebacklogs: { type: Number, required: true },
  image: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  contact: { type: Number },
  address: { type: String },
  appliedin: [{ type: mongoose.Types.ObjectId, required: true, ref: "Drive" }],
  placedin: [{ type: mongoose.Types.ObjectId, required: true, ref: "Drive" }],
});

module.exports = mongoose.model("User", User);
