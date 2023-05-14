const User = require("../models/user");
const Drive = require("../models/drive");
const { validationResult } = require("express-validator");
const HttpError = require("../models/HttpError");

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed", 422);
    return next(error);
  }
  const { prn, password } = req.body;
  let user;
  try {
    user = await User.findOne({ prn: prn });
    if (!user || user.password !== password) {
      const error = new HttpError("Invalid credentials", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Login failed", 500);
    return next(error);
  }
  req.session.user = user.toObject({ getters: true });
  req.session.save();
  res.status(201).json({ user: user.toObject({ getters: true }) });
};

const updateProfile = async (req, res, next) => {
  const { userid, city, state, contact, email, address } = req.body;
  let user;
  try {
    user = await User.findById(userid);
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (contact !== undefined) user.contact = contact;
    if (email !== undefined) user.email = email;
    if (address !== undefined) user.address = address;
    await user.save();
  } catch (err) {
    const error = new HttpError("Updating Profile Failed", 500);
    return next(error);
  }

  res.status(201).json({ user: user.toObject({ getters: true }) });
};

const updatePassword = async (req, res, next) => {
  const { userid, currentpassword, newpassword, repeatpassword } = req.body;
  if (currentpassword === "" || newpassword === "" || repeatpassword === "") {
    const error = new HttpError("Please Enter all the fields", 401);
    return next(error);
  }
  let user;
  try {
    user = await User.findById(userid);
    if (user.password !== currentpassword) {
      const error = new HttpError(
        "Password Doesn't match with current password",
        401
      );
      return next(error);
    }
    if (newpassword !== repeatpassword) {
      const error = new HttpError("Confirm password is wrong", 401);
      return next(error);
    }
    user.password = newpassword;
    await user.save();
  } catch (err) {
    const error = new HttpError("Updating Password Failed", 500);
    return next(error);
  }
  res.status(201).json({ user: user.toObject({ getters: true }) });
};

const applyDrive = async (req, res, next) => {
  const cid = req.params.cid;
  const { id } = req.body;
  let user;
  try {
    user = await User.findById(id);
    // user.appliedin.push(cid);
    let drive = await Drive.findById(cid);
    let eligible = drive.eligiblestudents;

    if (!eligible.includes(user.id)) {
      const error = new HttpError("Not Eligible", 401);
      return next(error);
    }
    if (drive.appliedstudents.includes(id)) {
      const error = new HttpError("Already Applied", 401);
      return next(error);
    }
    drive.appliedstudents.push(id);
    await drive.save();
    await user.save();
  } catch (err) {
    const error = new HttpError("Applying Drive Failed", 500);
    return next(error);
  }
  res.status(201).json({ user: user.toObject({ getters: true }) });
};

exports.applyDrive = applyDrive;

exports.updatePassword = updatePassword;
exports.updateProfile = updateProfile;
exports.loginUser = loginUser;
