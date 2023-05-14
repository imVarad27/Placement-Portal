import React, { useContext, useState } from "react";
import "./StudentProfile.css";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";
const StudentProfile = () => {
  const [status, setStatus] = useState(false);
  const setStatusHandler = () => {
    setStatus(!status);
  };
  const ctx = useContext(AuthContext);
  const logOutHandler = () => {
    ctx.logout();
  };
  return (
    <div className="action">
      <div className="profile" onClick={setStatusHandler}>
        <img src={ctx.user.image} />
      </div>
      <div className={`menu ${status ? "active" : ""}`}>
        <h3>
          {ctx.user.name}
          <br />
          <span>B.Tech {ctx.user.stream}</span>
        </h3>
        <ul className="student-profile-link">
          <li>
            <Link to="/student/profile" style={{ textDecoration: "none" }}>
              <i className="fa-solid fa-user student-profile__icon"></i>
              <span>My profile</span>
            </Link>
          </li>

          <li>
            <Link
              to="/student/annoucements/"
              style={{ textDecoration: "none" }}
            >
              <i className="fa-solid fa-bullhorn student-profile__icon"></i>
              <span>Annoucements</span>
            </Link>
          </li>
          <li>
            <Link to="/student/settings/" style={{ textDecoration: "none" }}>
              <i className="fa-solid fa-gear student-profile__icon"></i>
              <span>Account Settings</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={logOutHandler}>
              <i className="fa-solid fa-arrow-right-from-bracket student-profile__icon"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentProfile;
