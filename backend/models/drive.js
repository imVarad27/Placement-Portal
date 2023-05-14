const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyDetails = new Schema({
  companyname: { type: String },
  companywebsite: { type: String },
  organisationtype: {
    type: String,
  },
  industrytype: {
    type: String,
  },
  aboutcompany: { type: String },
  companylogo: { type: String },
});

const JobProfileDetails = new mongoose.Schema({
  jobprofile: { type: String },
  passoutbatch: { type: Number },
  recruitingfor: {
    type: String,
  },
  tentativejoiningdate: { type: Date },
  jobtitle: { type: String },
  joblocation: { type: String },
  jobdescription: { type: String },
});

const StudentEligibilityDetails = new mongoose.Schema({
  eligiblebranches: [
    {
      type: String,
    },
  ],
  minimumcgpa: { type: Number },
  minimum10thpercentage: { type: Number },
  minimum12thpercentage: { type: Number },
  minimumdiplomapercentage: { type: Number },
  minimumbacklogs: { type: Number },
  minimumlivebacklogs: { type: Number },
  serviceagreement: { type: String },
});

const PackageDetails = new mongoose.Schema({
  packageoffered: { type: String },
  allowplacedstudents: {
    type: String,
  },
});

const SelectionProcess = new mongoose.Schema({
  aptitudetest: { type: String },
  technicaltest: { type: String },
  groupdiscussion: { type: String },
  numberofrounds: { type: Number },
  date: { type: Date },
});

const RegistrationDetails = new mongoose.Schema({
  registrationstartdate: { type: Date },
});

const Drive = new mongoose.Schema({
  companydetails: { type: CompanyDetails },
  jobprofiledetails: { type: JobProfileDetails },
  studenteligibilitydetails: {
    type: StudentEligibilityDetails,
  },
  packagedetails: { type: PackageDetails },
  selectionprocess: { type: SelectionProcess },
  registrationdetails: { type: RegistrationDetails },
  eligiblestudents: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
  appliedstudents: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
  selectedstudents: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Drive", Drive);
