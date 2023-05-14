import React, { useContext, useEffect, useRef, useState } from "react";
import "./StudentMain.css";
import { AuthContext } from "../context/auth-context";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
const StudentMain = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const ctx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 1200);
    return () => clearTimeout(timer);
  }, [error, success]);

  const [user, setUser] = useState(ctx.user);
  const cityRef = useRef();
  const stateRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();

  const updateProfileButtonHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5500/api/user/updateprofile",
        {
          method: "POST",
          body: JSON.stringify({
            userid: ctx.user.id,
            city: cityRef.current.value,
            state: stateRef.current.value,
            contact: contactRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
      } else {
        const data = await response.json();
        console.log(data);
        setUser(data.user);
        ctx.user = data.user;
        setSuccess("Profile Updated Successfully");
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
      {success && (
        <Alert
          variant="filled"
          everity="success"
          style={{
            position: "absolute",
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
      <div className="studentmain-container marginleft" value={user}>
        <div>
          <h3>Student Profile</h3>
          <div className="studentmain-profile">
            <img
              src={ctx.user.image}
              alt="Student Image"
              className="studentmain-profile__img"
            />
            <hr />
            <div className="studentmain-contact">
              <div>
                <h4>Email Address</h4>
                <p>{ctx.user.email}</p>
              </div>
              <div>
                <h4>Contact Number</h4>
                <p>{ctx.user.contact ? ctx.user.contact : "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="student-form">
          <h3>Profile Details</h3>
          <div className="studentmain-profiledetails">
            <div className="studentmain-profiledetails__details">
              <div className="studentmain-form-content">
                <div className="studentmain-form-values">
                  <label>Name</label>
                  <input type="text" placeholder={ctx.user.name} readOnly />
                </div>
                <div className="studentmain-form-values">
                  <label>PRN</label>
                  <input type="text" placeholder={ctx.user.prn} readOnly />
                </div>
              </div>
              <div className="studentmain-form-content">
                <div className="studentmain-form-values">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    defaultValue={ctx.user.email}
                    ref={emailRef}
                  />
                </div>
                <div className="studentmain-form-values">
                  <label>Branch</label>
                  <input type="text" placeholder={ctx.user.stream} readOnly />
                </div>
              </div>
              <div className="studentmain-form-content">
                <div className="studentmain-form-values">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Enter Your City"
                    ref={cityRef}
                    defaultValue={ctx.user.city ? ctx.user.city : ""}
                  />
                </div>
                <div className="studentmain-form-values">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="Enter Your State"
                    ref={stateRef}
                    defaultValue={ctx.user.state ? ctx.user.state : ""}
                  />
                </div>
              </div>
              <div className="studentmain-form-content">
                <div className="studentmain-form-values">
                  <label>Mobile No.</label>
                  <input
                    type="text"
                    placeholder="Enter Your Mobile No."
                    defaultValue={ctx.user.contact ? ctx.user.contact : ""}
                    ref={contactRef}
                  />
                </div>
                <div className="studentmain-form-values">
                  <label>CGPA</label>
                  <input type="text" placeholder={ctx.user.cgpa} readOnly />
                </div>
              </div>
              <div className="studentmain-form-content">
                <div className="studentmain-form-values">
                  <label>10th Score</label>
                  <input type="text" placeholder={ctx.user.ssc} readOnly />
                </div>
                <div className="studentmain-form-values">
                  <label>12th Score</label>
                  <input type="text" placeholder={ctx.user.hsc} readOnly />
                </div>
              </div>
              <div className="studentmain-form-content address-field">
                <div className="studentmain-form-values">
                  <label>Address</label>
                  <input
                    type="text"
                    defaultValue={ctx.user.address ? ctx.user.address : ""}
                    ref={addressRef}
                  />
                </div>
              </div>
            </div>
            <div className="studentmain-form-content loading-with-button">
              <button onClick={updateProfileButtonHandler}>
                Update Profile
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentMain;
