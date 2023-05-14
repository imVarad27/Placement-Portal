import React, { useEffect, useRef, useState } from "react";
import Styles from "./CreateDrive.module.css";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
const CreateDrive = () => {
  const [other, setOther] = useState(false);
  const [imgUploadOption, setImgUploadOption] = useState("");

  const [checked, setChecked] = useState([]);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, error]);

  const branchCheckboxHandler = (e) => {
    if (e.target.checked) {
      setChecked([...checked, e.target.value]);
    } else {
      setChecked(checked.filter((item) => item !== e.target.value));
    }
  };

  const imgUploadHandler = (e) => {
    setImgUploadOption(e.target.value);
  };

  const handleOther = (e) => {
    if (e.target.value === "other") {
      setOther(true);
    } else {
      setOther(false);
    }
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data["eligibleBranches"] = checked;

    // const passingData = {
    //   companyname: data.companyname,
    //   companywebsite: data.companywebsite,
    //   organisationtype: data.organisationtype,
    //   industrytype: data.industrytype,
    //   aboutcompany: data.aboutcompany,
    //   companylogo: data.companylogolink,
    //   jobprofile: data.jobprofile,
    //   passoutbatch: data.passoutbatch,
    //   recruitingfor: data.recruitingfor,
    //   tentativejoiningdate: data.tentativejoiningdate,
    //   jobdescription: data.jobdescription,
    //   eligiblebranches: data.eligiblebranches,
    //   minimumcgpa: data.minimumcgpa,
    //   minimum10thpercentage: data.minimum10thpercentage,
    //   minimum12thpercentage: data.minimum12thpercentage,
    //   minimumdiplomapercentage: data.minimumdiplomapercentage,
    //   minimumbacklogs: data.minimumbacklogs,
    //   minimumlivebacklogs: data.minimumlivebacklogs,
    //   serviceagreement: data.serviceagreement,
    //   packageoffered: data.packageoffered,
    //   allowplacedstudents: data.allowplacedstudents,
    //   aptitudetest: data.aptitudetest,
    //   technicaltest: data.technicaltest,
    //   groupdiscussion: data.groupdiscussion,
    //   numberofrounds: data.numberofrounds,
    //   date: data.date,
    //   registrationstartdate: data.registrationstartdate,
    // };
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5500/api/admin/adddrive", {
        method: "POST",
        body: JSON.stringify({
          companyname: data.companyname,
          companywebsite: data.companywebsite,
          organisationtype: data.organisationtype,
          industrytype: data.industrytype,
          aboutcompany: data.aboutcompany,
          companylogo: data.companylogolink,
          jobprofile: data.jobprofile,
          passoutbatch: data.passoutbatch,
          recruitingfor: data.recruitingfor,
          tentativejoiningdate: data.tentativejoiningdate,
          jobtitle: data.jobtitle,
          joblocation: data.joblocation,
          jobdescription: data.jobdescription,
          eligiblebranches: data.eligibleBranches,
          minimumcgpa: data.minimumcgpa,
          minimum10thpercentage: data.minimum10thpercentage,
          minimum12thpercentage: data.minimum12thpercentage,
          minimumdiplomapercentage: data.minimumdiplomapercentage,
          minimumbacklogs: data.minimumbacklogs,
          minimumlivebacklogs: data.minimumlivebacklogs,
          serviceagreement: data.serviceagreement,
          packageoffered: data.packageoffered,
          allowplacedstudents: data.allowplacedstudents,
          aptitudetest: data.aptitudetest,
          technicaltest: data.technicaltest,
          groupdiscussion: data.groupdiscussion,
          numberofrounds: data.numberofrounds,
          date: data.date,
          registrationstartdate: data.registrationstartdate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
      } else {
        setSuccess("Drive Created Successfully");
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          style={{
            position: "fixed",
            top: 77,
            right: 18,
            zIndex: 999,
            width: 300,
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          variant="filled"
          everity="success"
          style={{
            position: "fixed",
            top: 77,
            right: 18,
            zIndex: 999,
            width: 300,
          }}
        >
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>
      )}
      <form
        onSubmit={formSubmitHandler}
        className={`marginleft ${Styles["create-drive"]}`}
      >
        <h3>Create New Drive</h3>
        <div className={`${Styles["create-drive__form"]}`}>
          <div>
            <h3>Company Details</h3>
            <p>Enter Company Details for new Drive</p>
          </div>
          <div className={`${Styles["form-container"]}`}>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="companyname">Company Name</label>
                <input
                  id="companyname"
                  name="companyname"
                  type="text"
                  placeholder="Enter Company Name"
                />
              </div>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="companywebsite">Company Website</label>
                <input
                  id="companywebsite"
                  name="companywebsite"
                  type="text"
                  placeholder="Enter Company Website Link"
                />
              </div>
            </div>
            <div
              className={`${Styles["create-drive__form__company-details"]} ${Styles["options"]}`}
            >
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="organisationtype">Organisation Type</label>
                <select id="organisationtype" name="organisationtype">
                  <option value="">Select Organisation Type</option>
                  <option value="Product Based">Product Based</option>
                  <option value="Service Based">Service Based</option>
                  <option value="Startup">Startup</option>
                </select>
              </div>
              <div className={`${Styles["other-options"]}`}>
                <div className={`${Styles["form-content"]}`}>
                  <label htmlFor="industrytype">Industry Type</label>
                  <select
                    id="industrytype"
                    name="industrytype"
                    onChange={handleOther}
                  >
                    <option value="">Select Industry Type</option>
                    <option value="IT">IT</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Core">Core</option>
                    <option value="Finance">Finance</option>
                    <option value="Consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div
                  className={`${Styles["form-content"]} ${
                    Styles[!other ? "inactive" : ""]
                  } `}
                >
                  <label htmlFor="otherindustrytype">Enter industry type</label>
                  <input
                    id="otherindustrytype"
                    name="otherindustrytype"
                    type="text"
                    placeholder="e.g: IT"
                  />
                </div>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["create-drive__form__company-details"]}`}
              >
                <div className={`${Styles["form-content"]}`}>
                  <label htmlFor="aboutcompany">About Company</label>
                  <textarea
                    id="aboutcompany"
                    name="aboutcompany"
                    className={`${Styles["text-area"]}`}
                    placeholder="Enter About Company"
                    cols={70}
                    rows={3}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="companylogo">Company Logo</label>
                <select
                  id="companylogo"
                  name="companylogo"
                  onChange={imgUploadHandler}
                >
                  <option value="default">Select Company Logo</option>
                  <option value="upload">Upload</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <div
                className={`${Styles["form-content"]}
              ${imgUploadOption === "default" ? Styles["inactive"] : ""}`}
              >
                <div
                  className={`${
                    imgUploadOption === "upload" ? "" : Styles["inactive"]
                  }`}
                >
                  <div
                    className={
                      `${Styles["low-width-upload"]}` +
                      ` ${Styles["upload-img"]}`
                    }
                  >
                    <label htmlFor="uploadcompanylogo">
                      Upload Company Logo
                    </label>
                    <input
                      id="uploadcompanylogo"
                      name="uploadcompanylogo"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div
                  className={
                    `${imgUploadOption === "link" ? "" : Styles["inactive"]}` +
                    " " +
                    `${Styles["low-width"]}`
                  }
                >
                  <label htmlFor="companylogolink">Enter Image Link</label>
                  <input
                    id="companylogolink"
                    name="companylogolink"
                    type="text"
                    placeholder="Enter Image Link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${Styles["create-drive__form"]}`}>
          <div>
            <h3>Job Profile Details</h3>
            <p>Enter Job Details for new Drive</p>
          </div>
          <div className={`${Styles["form-container"]}`}>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="jobprofile">Job Profile</label>
                <input
                  id="jobprofile"
                  name="jobprofile"
                  type="text"
                  placeholder="Enter Job Profile"
                />
              </div>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="passoutbatch">Passout Batch</label>
                <select id="passoutbatch" name="passoutbatch">
                  <option value="">Select Passout Batch</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="recruitingfor">Recruiting For?</label>
                <select id="recruitingfor" name="recruitingfor">
                  <option value="">Select Recruiting For</option>
                  <option value="Internship">Internship</option>
                  <option value="Full Time">Full Time</option>
                </select>
              </div>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="recruitingfor">Tentative Date of Joining</label>
                <input
                  id="tentativedateofjoining"
                  name="tentativedateofjoining"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  placeholder="Enter Tentative Date of Joining"
                />
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="joblocation">Job Location</label>
                <input
                  placeholder="Enter Job Location"
                  type="text"
                  id="joblocation"
                  name="joblocation"
                ></input>
              </div>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="jobtitle">Job Title</label>
                <input
                  placeholder="Enter Job Title"
                  type="text"
                  id="jobtitle"
                  name="jobtitle"
                ></input>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["create-drive__form__company-details"]}`}
              >
                <div className={`${Styles["form-content"]}`}>
                  <label htmlFor="jobdescription">Job Description</label>
                  <textarea
                    id="jobdescription"
                    name="jobdescription"
                    className={`${Styles["text-area"]}`}
                    placeholder="Enter Job Description"
                    cols={70}
                    rows={3}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${Styles["create-drive__form"]}`}>
          <div>
            <h3>Student Eligibility Details</h3>
            <p>Enter Student Eligibility Details</p>
          </div>
          <div className={`${Styles["form-container"]}`}>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="eligiblebranches">Eligible Branches :</label>
                <div className={`${Styles["checkbox-style"]}`}>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Computer Science"
                      name="eligiblebranches[]"
                      value="Computer Science"
                      type="checkbox"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Computer Science">Computer Science</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Computer Science(AI)"
                      name="eligiblebranches[]"
                      value="Computer Science(AI)"
                      type="checkbox"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Computer Science(AI)">
                      Computer Science(AI)
                    </label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Electronics and Telecommunication"
                      name="eligiblebranches[]"
                      type="checkbox"
                      value="Electronics and Telecommunication"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Electronics and Telecommunication">
                      Electronics and Telecommunication
                    </label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Electrical"
                      name="eligiblebranches[]"
                      type="checkbox"
                      value="Electrical"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Electrical">Electrical</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Mechanical"
                      name="eligiblebranches[]"
                      type="checkbox"
                      value="Mechanical"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Mechanical">Mechanical</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Civil"
                      name="eligiblebranches[]"
                      value="Civil"
                      type="checkbox"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Civil">Civil</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="minimumcgpa">Minimum CGPA</label>
                <div className={`${Styles["newinput"]}`}>
                  <input
                    id="minimumcgpa"
                    name="minimumcgpa"
                    type="text"
                    placeholder="Enter Minimum CGPA"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>CGPA</span>
                  </div>
                </div>
              </div>
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="minimum10thpercentage">
                  Enter minimum 10th Percentage
                </label>
                <div className={`${Styles["newinput"]}`}>
                  <input
                    id="minimum10thpercentage"
                    type="text"
                    name="minimum10thpercentage"
                    placeholder="Enter Minimum 10th Percentage"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>10th%</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${Styles["create-drive__form__company-details"]} `}
            >
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="minimum12thpercentage">
                  Enter minimum 12th Percentage
                </label>
                <div className={`${Styles["newinput"]}`}>
                  <input
                    id="minimum12thpercentage"
                    name="minimum12thpercentage"
                    type="text"
                    placeholder="Enter Minimum 12th Percentage"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>12th%</span>
                  </div>
                </div>
              </div>
              <div className={`${Styles["form-content"]} `}>
                <label htmlFor="minimumdiplomapercentage">
                  Enter minimum Diploma Percentage
                </label>
                <div
                  className={`${Styles["newinput"]} ${Styles["less-width"]}`}
                >
                  <input
                    id="minimumdiplomapercentage"
                    name="minimumdiplomapercentage"
                    type="text"
                    placeholder="Enter Diploma percentage"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>Diploma%</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${Styles["create-drive__form__company-details"]} `}
            >
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="minimumbacklogs">Enter Backlogs</label>
                <div className={`${Styles["newinput"]}`}>
                  <input
                    id="minimumbacklogs"
                    name="minimumbacklogs"
                    type="text"
                    placeholder="Enter Backlogs"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>Backlogs</span>
                  </div>
                </div>
              </div>
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="minimumlivebacklogs">Enter Live Backlogs</label>
                <div className={`${Styles["newinput"]}`}>
                  <input
                    id="minimumlivebacklogs"
                    name="minimumlivebacklogs"
                    type="text"
                    placeholder="Enter Live Backlogs"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>Backlogs</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${Styles["create-drive__form__company-details"]} `}
            >
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]} `}
              >
                <label htmlFor="minimum12thpercentage">
                  Service Agreement?
                </label>
                <select
                  id="selectserviceagreement"
                  name="selectserviceagreement"
                >
                  <option value="">Select Service Agreement</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={`${Styles["create-drive__form"]}`}>
          <div>
            <h3>Package Details</h3>
            <p>Enter Package Details</p>
          </div>
          <div className={`${Styles["form-container"]} `}>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="packageoffered">Package Offered</label>
                <div
                  className={`${Styles["newinput"]} ${Styles["less-width"]}`}
                >
                  <input
                    id="packageoffered"
                    name="packageoffered"
                    type="text"
                    placeholder="Enter Package Offered"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>LPA</span>
                  </div>
                </div>
              </div>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="allowplacedstudents">
                  Allow Placed Students?
                </label>
                <select id="allowplacedstudents" name="allowplacedstudents">
                  <option value="">Select Allow Placed Students?</option>
                  <option value="No">No</option>
                  <option value="Only for Higher Package">
                    Only for Higher Package
                  </option>
                  <option value="Allow all">Allow All</option>
                </select>
              </div>
            </div>
          </div>

          {/*
        <div className={`${Styles["form-container"]} `}>
          <div className={`${Styles["create-drive__form__company-details"]}`}>
            <div className={`${Styles["form-content"]}`}>
              <label>Package Offered</label>
              <div className={`${Styles["newinput"]}`}>
                <input type="text" placeholder="Enter Package Offered" />
                <div className={`${Styles["grey-box"]}`}>
                  <span>LPA</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
        <div className={`${Styles["create-drive__form"]}`}>
          <div>
            <h3>Selection Process</h3>
            <p>Enter Selection Process</p>
          </div>
          <div className={`${Styles["form-container"]} `}>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["form-content"]} ${Styles["new-options"]}`}
              >
                <label htmlFor="aptitudetest">Aptitude Test:</label>
                <select id="aptitudetest" name="aptitudetest">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["form-content"]} ${Styles["new-options"]}`}
              >
                <label htmlFor="technicaltest">Technical Test:</label>
                <select id="technicaltest" name="technicaltest">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["form-content"]} ${Styles["new-options"]}`}
              >
                <label htmlFor="groupdiscussion">Group Discussion:</label>
                <select id="groupdiscussion" name="groupdiscussion">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="numberofrounds">Number of Rounds:</label>
                <div className={`${Styles["newinput"]}  `}>
                  <input
                    id="numberofrounds"
                    name="numberofrounds"
                    type="text"
                    placeholder="Enter Number of Rounds"
                  />
                  <div className={`${Styles["grey-box"]}`}>
                    <span>Rounds</span>
                  </div>
                </div>
              </div>
              <div
                className={`${Styles["form-content"]} ${Styles["less-width"]}`}
              >
                <label htmlFor="date">Date</label>
                <div className={`${Styles["newinput"]}  `}>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${Styles["create-drive__form"]}`}>
          <div>
            <h3>Registration Details</h3>
            <p>Enter Registration Details</p>
          </div>
          <div className={`${Styles["form-container"]} `}>
            <div className={`${Styles["create-drive__form__company-details"]}`}>
              <div className={`${Styles["form-content"]}`}>
                <label htmlFor="registrationstartdate">
                  Registration Start Date
                </label>
                <div className={`${Styles["newinput"]}  `}>
                  <input
                    id="registrationstartdate"
                    name="registrationstartdate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="loading-with-button__create-drive">
          <button className={`${Styles["btn-create-drive"]}`}>
            <i className="fa-regular fa-square-check"></i>
            Create Drive
          </button>
          {isLoading && (
            <CircularProgress
              style={{
                zIndex: "999",
                color: "#364fc7",
                height: "30px",
                width: "30px",
              }}
            />
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateDrive;
