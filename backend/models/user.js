const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  prn: { type: String, required: false, unique: true },
  name: { type: String, required: false },
  cgpa: { type: Number, required: false },
  stream: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  isselected: { type: Boolean, required: false },
  kt: { type: Boolean, required: false },
  batch: { type: Number, required: false },
  ssc: { type: Number, required: false },
  hsc: { type: Number, required: false },
  backlogs: { type: Number, required: false },
  livebacklogs: { type: Number, required: false },
  image: { type: String },
  city: { type: String },
  state: { type: String },
  contact: { type: Number },
  address: { type: String },
  appliedin: [{ type: mongoose.Types.ObjectId, ref: "Drive" }] || null,
  placedin: [{ type: mongoose.Types.ObjectId, ref: "Drive" }] || null,
  contact: { type: String },
});

module.exports = mongoose.model("User", User);
//module.exports = mongoose.model("newUser", newUser);
