import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./UserRegister.css";
import RegImg from "./../../assets/RegisterImg.svg";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
const UserRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    password: "",
    contact: "",
    email: "",
    stream: "",
    batch: 0,
    cgpa: 0,
    isselected: false,
    kt: false,
    ssc: 0,
    hsc: 0,
    backlogs: 0,
    livebacklogs: 0,
    image: `https://api.dicebear.com/6.x/initials/svg?seed=ADNAN+BARGIR}`,
    city: "",
    state: "",
    address: "",
  });
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5500/api/user/register/student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Registration successful!");
        // Handle successful registration (e.g., clear form, show success message)
        //setSuccessMessage("Registration successful! You can now log in.");

        history.push("/login/student");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      //console.error("Registration error:", error);
      setError("Network or server error occurred");
    }
    setIsLoading(false);
  };

  //const[]
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, index) => currentYear + index);

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "batch" && value !== "defaultYear" ? Number(value) : value,
    }));
  };
  return (
    <div className="wrapper-register">
      {error && (
        <Alert
          variant="filled"
          severity="error"
          style={{
            position: "absolute",
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
      {successMessage && (
        <Alert
          variant="filled"
          severity="success"
          style={{
            position: "absolute",
            top: 77,
            right: 18,
            zIndex: 999,
            width: 300,
          }}
        >
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}
      {isLoading && (
        <CircularProgress
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "999",
            color: "#364fc7",
          }}
        />
      )}
      {!isLoading && (
        <form className="login-register">
          <h2>Welcome, Student</h2>
          <p>Register</p>
          <div className="login-register__content">
            <input
              type="text"
              placeholder="Enter Your Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your PRN *"
              name="prn"
              value={formData.prn}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your Password *"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your Mobile No."
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your Email *"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <select
              name="stream"
              id="stream"
              value={formData.stream}
              onChange={handleInputChange}
            >
              <option value="defaultBranch"> Select Branch</option>
              <option value="Computer">Computer Science and Engineering</option>
              <option value="AI">Computer Science and Engineering(AI)</option>
              <option value="Electrical">Electrical Engineering</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Electronics">Electronics Engineering</option>
            </select>
            <select
              name="batch"
              id="batch"
              value={formData.batch}
              onChange={handleInputChange}
            >
              <option value="defaultYear">Select Batch</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter Your CGPA"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
            />
            <select
              type="text"
              placeholder="KT"
              name="kt"
              value={formData.kt}
              onChange={handleInputChange}
            >
              <option value="defaultKT">KT Status</option>
              <option value="{true}">True</option>
              <option value="{false}">False</option>
            </select>
            <input
              type="text"
              placeholder="Enter Your SSC Marks"
              name="ssc"
              value={formData.ssc}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your HSC Marks"
              name="hsc"
              value={formData.hsc}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your backlogs count"
              name="backlogs"
              value={formData.backlogs}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your livebacklogs count"
              name="livebacklogs"
              value={formData.livebacklogs}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Your address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" onClick={handleRegisterClick}>
            Register
          </button>
        </form>
      )}
      <img className="wrapper-register__image" src={RegImg} alt="Login Image" />
    </div>
  );
};

export default UserRegister;
