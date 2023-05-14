import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
const Navbar = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div
        className={ctx.isLoggedIn ? "placement-title user" : "placement-title"}
      >
        Placement Portal
      </div>
      {!ctx.isLoggedIn && (
        <ul className={ctx.isLoggedIn ? "navbar-items hidden" : "navbar-items"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="login-class">
            <div className="dropdown">
              <a className="dropbtn">Login</a>
              <div className="dropdown-content">
                <Link to="/login/student">Student</Link>
                <Link to="/login/admin">Admin</Link>
              </div>
            </div>
          </li>
          <li className="login-class">
            <div className="dropdown">
              <Link to="/register/student/" className="dropbtn">
                Register
              </Link>
            </div>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
