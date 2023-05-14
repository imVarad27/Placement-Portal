import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/context/auth-context";

import Styles from "./Card.module.css";
const Card = (props) => {
  const changeDateFormat = (newdate) => {
    const date = new Date(newdate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);
    return formattedDate;
  };
  const ctx = useContext(AuthContext);

  return (
    <div className={`${Styles["card"]}`}>
      <img src={props.img} alt="Company Logo" />
      <div className={`${Styles["job-content"]}`}>
        <div className={`${Styles["job-content-info"]}`}>
          {ctx.userType === "admin" && (
            <Link
              to={`/admin/company/${props.id}`}
              className={`${Styles["hover-effect"]}`}
            >
              <h2>{props.companyName}</h2>
            </Link>
          )}
          {ctx.userType === "student" && <h2>{props.companyName}</h2>}
          <span>
            <i
              className="fa-regular fa-calendar"
              style={{ color: "#364fc7" }}
            ></i>{" "}
            &nbsp; {changeDateFormat(props.date)}
          </span>
          <span>Salary: {props.salary}</span>
        </div>
        <h3 className={`${Styles["job-title"]}`}>{props.jobtitle}</h3>
        <p>{props.aboutcompany}</p>
        <div>
          {ctx.userType === "student" && (
            <Link to={`/student/company/${props.id}`}>
              <button className={`${Styles["btn-apply"]}`}>View</button>
            </Link>
          )}
          {ctx.userType === "admin" && (
            <React.Fragment>
              <button className={`${Styles["btn-delete"]} btn-apply`}>
                Delete
              </button>
              <button className={`${Styles["btn-view"]} btn-apply`}>
                Edit
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
