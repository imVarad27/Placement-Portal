const Admin = require("../models/admin");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const HttpError = require("../models/HttpError");
const Drive = require("../models/drive");

const loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingAdmin || existingAdmin.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  res.status(201).json({ admin: existingAdmin.toObject({ getters: true }) });
};

const addDrive = async (req, res, next) => {
  const {
    companyname,
    companywebsite,
    organisationtype,
    industrytype,
    aboutcompany,
    companylogo,
    jobprofile,
    passoutbatch,
    recruitingfor,
    tentativejoiningdate,
    jobtitle,
    joblocation,
    jobdescription,
    eligiblebranches,
    minimumcgpa,
    minimum10thpercentage,
    minimum12thpercentage,
    minimumdiplomapercentage,
    minimumbacklogs,
    minimumlivebacklogs,
    serviceagreement,
    packageoffered,
    allowplacedstudents,
    aptitudetest,
    technicaltest,
    groupdiscussion,
    numberofrounds,
    date,
    registrationstartdate,
  } = req.body;

  const createdDrive = new Drive({
    companydetails: {
      companyname,
      companywebsite,
      organisationtype,
      industrytype,
      aboutcompany,
      companylogo,
    },
    jobprofiledetails: {
      jobprofile,
      passoutbatch,
      recruitingfor,
      tentativejoiningdate,
      jobtitle,
      joblocation,
      jobdescription,
    },
    studenteligibilitydetails: {
      eligiblebranches,
      minimumcgpa,
      minimum10thpercentage,
      minimum12thpercentage,
      minimumdiplomapercentage,
      minimumbacklogs,
      minimumlivebacklogs,
      serviceagreement,
    },
    packagedetails: {
      packageoffered,
      allowplacedstudents,
    },
    selectionprocess: {
      aptitudetest,
      technicaltest,
      groupdiscussion,
      numberofrounds,
      date,
    },
    registrationdetails: {
      registrationstartdate,
    },
  });

  try {
    await createdDrive.save();
  } catch (err) {
    const error = new HttpError(
      "Creating drive failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ drive: createdDrive });
};

const getDrives = async (req, res, next) => {
  let drives;
  try {
    drives = await Drive.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching drives failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    drives: drives.map((drive) => drive.toObject({ getters: true })),
  });
};

const getCompanyById = async (req, res, next) => {
  const cid = req.params.cid;
  let companydetails;
  try {
    companydetails = await Drive.findById(cid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a company.",
      500
    );
    return next(error);
  }
  if (!companydetails) {
    const error = new HttpError(
      "Could not find company for the provided id.",
      404
    );
    return next(error);
  }
  res.json({
    companydetails: companydetails.toObject({ getters: true }),
  });
};

const getAppliedStudents = async (req, res, next) => {
  const cid = req.params.cid;
  let drive;
  let appliedstudents;
  try {
    drive = await Drive.findById(cid).populate({
      path: "appliedstudents",
      model: "User",
    });
    appliedstudents = drive.appliedstudents;
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a company.",
      500
    );
    return next(error);
  }
  if (!appliedstudents) {
    const error = new HttpError(
      "Could not find company for the provided id.",
      404
    );
    return next(error);
  }
  res.status(200).json({
    appliedstudents: appliedstudents,
  });
};

const getEligibleStudents = async (req, res, next) => {
  const cid = req.params.cid;

  let drive;
  let eligiblestudents;
  let finalEligibleStudents = [];

  try {
    drive = await Drive.findById(cid).populate({
      path: "eligiblestudents",
      model: "User",
    });
    eligiblestudents = drive.eligiblestudents;
    await drive.save();
    const option = drive.packagedetails.allowplacedstudents;
    let allowHigher = false;
    if (option.includes("Higher")) {
      allowHigher = true;
    }
    if (eligiblestudents.length === 0) {
      const users = await User.find().populate("placedin");
      const neweligiblestudents = users.filter((user) => {
        const branches = drive.studenteligibilitydetails.eligiblebranches;
        let userBranch = user.stream;
        userBranch = userBranch.replace("Engineering", "");
        if (userBranch.includes("Computer Science")) {
          userBranch = "Computer Science";
        }
        if (userBranch.includes("Artificial Intelligence")) {
          userBranch = "Computer Science(AI)";
        }
        if (userBranch.includes("Electronics")) {
          userBranch = "Electronics and Telecommunication";
        }
        if (userBranch.includes("Electrical")) {
          userBranch = "Electrical";
        }
        if (userBranch.includes("Mechanical")) {
          userBranch = "Mechanical";
        }
        if (userBranch.includes("Civil")) {
          userBranch = "Civil";
        }
        let package = drive.packagedetails.packageoffered;
        package = parseInt(package);
        let maxPackage = 0;
        let allowStudent = false;
        if (allowHigher) {
          const placedInArray = user.placedin;
          placedInArray.forEach((company) => {
            let currentPackage = company.packagedetails.packageoffered;
            currentPackage = parseInt(currentPackage);
            if (currentPackage > maxPackage) {
              maxPackage = currentPackage;
            }
          });
          if (package > maxPackage) {
            allowStudent = true;
          }
          const isBranchEligible = branches.includes(userBranch);
          const isCGPAEligible =
            user.cgpa >= drive.studenteligibilitydetails.minimumcgpa;
          const is10th =
            user.ssc >= drive.studenteligibilitydetails.minimum10thpercentage;
          const is12th =
            user.hsc >= drive.studenteligibilitydetails.minimum12thpercentage;
          const minimumbacklogs =
            user.backlogs <= drive.studenteligibilitydetails.minimumbacklogs;
          if (
            isBranchEligible &&
            isCGPAEligible &&
            is10th &&
            is12th &&
            allowStudent &&
            minimumbacklogs
          ) {
            return user;
          }
        } else {
          const isBranchEligible = branches.includes(userBranch);
          const isCGPAEligible =
            user.cgpa >= drive.studenteligibilitydetails.minimumcgpa;
          const is10th =
            user.ssc >= drive.studenteligibilitydetails.minimum10thpercentage;
          const is12th =
            user.hsc >= drive.studenteligibilitydetails.minimum12thpercentage;
          const minimumbacklogs =
            user.backlogs <= drive.studenteligibilitydetails.minimumbacklogs;
          const placedinLength = user.placedin.length === 0;
          if (
            isBranchEligible &&
            isCGPAEligible &&
            is10th &&
            is12th &&
            minimumbacklogs &&
            placedinLength
          ) {
            return user;
          }
        }
      });
      const arrayForDB = neweligiblestudents.map((student) => [student]);
      drive.eligiblestudents = arrayForDB;
      await drive.save();
      return res.status(200).json({
        eligiblestudents: neweligiblestudents,
      });
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a company.",
      500
    );
    return next(error);
  }
  if (!eligiblestudents) {
    const error = new HttpError(
      "Could not find company for the provided id.",
      404
    );
    return next(error);
  }

  res.status(200).json({
    eligiblestudents: eligiblestudents,
  });
};
const dashboard = async (req, res) => {
  try {
    let students;
    students = await User.find().sort({ prn: 1 });
    res.status(200).json({
      students: students,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const applyForDrive = async (req, res, next) => {
  const cid = req.params.cid;
  const { selectedstudents } = req.body;
  let drive;
  try {
    drive = await Drive.findById(cid);
    selectedstudents.forEach((student) => {
      let found = false;
      for (let i = 0; i < drive.appliedstudents.length; i++) {
        if (drive.appliedstudents[i][0]._id.toString() === student._id) {
          found = true;
          break;
        }
      }
      if (!found) {
        student = [student];
        drive.appliedstudents.push(student);
      }
    });
    await drive.save();
    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a company.",
      500
    );
    return next(error);
  }
};

const placeStudent = async (req, res, next) => {
  const cid = req.params.cid;
  const { selectedstudents } = req.body;
  let drive;
  try {
    drive = await Drive.findById(cid);
    selectedstudents.forEach(async (student) => {
      let found = false;
      for (let i = 0; i < drive.selectedstudents.length; i++) {
        if (drive.selectedstudents[i][0]._id.toString() === student._id) {
          found = true;
          break;
        }
      }
      if (found) {
        let tempStudent = await User.findById(student._id);
        let foundCompany = false;
        for (let i = 0; i < tempStudent.placedin.length; i++) {
          if (tempStudent.placedin[i]._id.toString() === drive._id.toString()) {
            foundCompany = true;
            break;
          }
        }
        if (!foundCompany) {
          tempStudent.placedin.push(drive);
        }
        await tempStudent.save();
      }
      if (!found) {
        let tempStudent = await User.findById(student._id);
        student = [student];
        drive.selectedstudents.push(student);
        let foundCompany = false;
        for (let i = 0; i < tempStudent.placedin.length; i++) {
          if (tempStudent.placedin[i]._id.toString() === drive._id.toString()) {
            foundCompany = true;
            break;
          }
        }
        if (!foundCompany) {
          tempStudent.placedin.push(drive);
        }
        await tempStudent.save();
      }
    });
    await drive.save();
    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a company.",
      500
    );
    return next(error);
  }
};

const getSelectedStudents = async (req, res, next) => {
  try {
    const users = await User.find().sort({ prn: 1 }).populate("placedin");

    let selectedstudents = [];
    users.forEach((user) => {
      if (user.placedin.length !== 0) {
        selectedstudents.push(user);
      }
    });
    res.status(200).json({
      selectedstudents: selectedstudents,
    });
  } catch (error) {
    const err = new HttpError("Something went wrong", 500);
    return next(err);
  }
};

exports.getSelectedStudents = getSelectedStudents;
exports.placeStudent = placeStudent;
exports.applyForDrive = applyForDrive;
exports.getEligibleStudents = getEligibleStudents;
exports.getAppliedStudents = getAppliedStudents;
exports.getCompanyById = getCompanyById;
exports.getDrives = getDrives;
exports.addDrive = addDrive;
exports.loginAdmin = loginAdmin;
exports.dashboard = dashboard;
