import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import Styles from "./ViewCompany.module.css";
import { Link, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
const ViewCompany = (props) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const cid = useParams();
  const [companyData, setCompanyData] = useState();
  const ctx = useContext(AuthContext);

  const changeDateFormat = (newdate) => {
    const date = new Date(newdate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);
    return formattedDate;
  };

  useEffect(() => {
    const getCompanyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/api/admin/company/${cid.id}`
        );
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
        } else {
          const data = await response.json();
          setCompanyData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCompanyDetails();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 1200);
    return () => clearTimeout(timer);
  }, [success, error]);

  const applyNowHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/user/applydrive/${cid.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: ctx.user.id,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
      } else {
        const data = await response.json();
        ctx.user = data.user;
        setSuccess("Applied Successfully");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
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
      {companyData && (
        <div className={`marginleft ${Styles["view-company"]}`}>
          <div className={`${Styles["company-info"]}`}>
            <img
              src={companyData.companydetails.companydetails.companylogo}
              alt="Company Logo"
              className={`${Styles["company-logo"]}`}
            />
            <div className={`${Styles["about-company"]}`}>
              <h3 className={`${Styles["company-title"]}`}>
                {companyData.companydetails.companydetails.companyname}
              </h3>
              <span>
                {companyData.companydetails.companydetails.companywebsite}
              </span>
            </div>
            {ctx.userType === "student" && (
              <button
                onClick={applyNowHandler}
                className={`${Styles["btn-apply"]}`}
              >
                Apply Now
              </button>
            )}
            {ctx.userType === "admin" && (
              <div className={`${Styles["admin-buttons"]}`}>
                <Link
                  to={`/admin/company/${companyData.companydetails.id}/applied`}
                >
                  <button className={`${Styles["btn-apply"]}`}>
                    View Applied Students
                  </button>
                </Link>
                <Link
                  to={`/admin/company/${companyData.companydetails.id}/eligible`}
                >
                  <button className={`${Styles["btn-apply"]}`}>
                    View Eligible Students
                  </button>
                </Link>
              </div>
            )}
          </div>
          <hr
            style={{
              marginTop: "20px",
            }}
          />
          <section className={`${Styles["company-description"]}`}>
            <h3>About Company</h3>
            <p>{companyData.companydetails.companydetails.aboutcompany}</p>
            <h3> Job Description</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              {/* <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                  quisquam aspernatur quia, quas facere optio incidunt
                  repellendus
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                  quisquam aspernatur quia, quas facere optio incidunt
                  repellendus
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                  quisquam aspernatur quia, quas facere optio incidunt
                  repellendus
                </li> */}
              {companyData.companydetails.jobprofiledetails.jobdescription}
            </div>
            <h3>Company Type</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              {companyData.companydetails.companydetails.organisationtype}
            </div>
            <h3>Industry Type</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              {companyData.companydetails.companydetails.industrytype}
            </div>
            <h3>Recruiting For</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              {companyData.companydetails.jobprofiledetails.recruitingfor}
            </div>

            <h3> Eligibility Criteria</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              <h4>Eligible Batch</h4>
              <ul>
                <li>
                  {companyData.companydetails.jobprofiledetails.passoutbatch}
                </li>
              </ul>
              <h4>CGPA</h4>
              <ul>
                <li>
                  {companyData.companydetails.studenteligibilitydetails
                    .minimumcgpa + ".0"}{" "}
                  and above
                </li>
              </ul>
              <h4>Branches</h4>
              <ul>
                {companyData.companydetails.studenteligibilitydetails.eligiblebranches.map(
                  (branch) => {
                    return <li key={branch}>{branch}</li>;
                  }
                )}
              </ul>
              <h4>Backlogs</h4>
              <ul>
                <li>
                  Maximum Backlogs Allowed:{" "}
                  {
                    companyData.companydetails.studenteligibilitydetails
                      .minimumbacklogs
                  }
                </li>
                <li>
                  Maximum Live Backlogs Allowed:{" "}
                  {
                    companyData.companydetails.studenteligibilitydetails
                      .minimumlivebacklogs
                  }
                </li>
                <li>
                  Minimum 10th Percentage:{" "}
                  {
                    companyData.companydetails.studenteligibilitydetails
                      .minimum10thpercentage
                  }
                </li>
                <li>
                  Minimum 12th Percentage:{" "}
                  {
                    companyData.companydetails.studenteligibilitydetails
                      .minimum12thpercentage
                  }
                </li>
              </ul>
            </div>
            <h3>Selection Process</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              <ul>
                {companyData.companydetails.selectionprocess.aptitudetest && (
                  <li>Aptitude Test</li>
                )}
                {companyData.companydetails.selectionprocess.technicaltest && (
                  <li>Technical Test</li>
                )}
                {companyData.companydetails.selectionprocess
                  .groupdiscussion && <li>Group Discussion</li>}
              </ul>
            </div>
            <h3>Salary</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              <ul>
                <li>
                  CTC {companyData.companydetails.packagedetails.packageoffered}{" "}
                  LPA
                </li>
              </ul>
            </div>
            <h3>Job Location</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              <ul>
                <li>
                  {companyData.companydetails.jobprofiledetails.joblocation}
                </li>
              </ul>
            </div>

            <h3>Job Role</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              <ul>
                <li>{companyData.companydetails.jobprofiledetails.jobtitle}</li>
              </ul>
            </div>
            <h3>Last Date to Apply</h3>
            <div className={`${Styles["shift-to-right"]}`}>
              <ul>
                <li>
                  {changeDateFormat(
                    companyData.companydetails.registrationdetails
                      .registrationstartdate
                  )}
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ViewCompany;
