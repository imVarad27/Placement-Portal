import React from "react";
import "./UserRegister.css";
import RegImg from "./../../assets/RegisterImg.svg";
const UserRegister = () => {
  return (
    <div className="wrapper-register">
      <form className="login-register">
        <h2>Welcome, Student</h2>
        <p>Register</p>
        <div className="login-register__content">
          <input type="text" placeholder="Enter Your Name" />
          <input type="text" placeholder="Enter Your PRN" />
          <input type="text" placeholder="Enter Your Password" />
          <input type="text" placeholder="Enter Your Mobile No." />
          <input type="password" placeholder="Password" />
          <select name="branch" id="branch">
            <option value="defaultBranch"> Select Branch</option>
            <option value="Computer">Computer Science and Engineering</option>
            <option value="AI">Computer Science and Engineering(AI)</option>
            <option value="Electrical">Electrical Engineering</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="Electronics">Electronics Engineering</option>
          </select>
          <select name="year" id="year">
            <option value="defaultYear">Select Year</option>
            <option value="FE">First Year</option>
            <option value="SE">Second Year</option>
            <option value="TE">Third Year</option>
            <option value="BE">Final Year</option>
          </select>
          <input type="text" placeholder="Enter Your CGPA" />
        </div>
        <button type="submit">Register</button>
      </form>
      <img className="wrapper-register__image" src={RegImg} alt="Login Image" />
    </div>
  );
};

export default UserRegister;
