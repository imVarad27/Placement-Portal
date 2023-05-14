import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "./StudentSettings.module.css";
import { AuthContext } from "../context/auth-context";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
const StudentSettings = () => {
  const ctx = useContext(AuthContext);
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 1200);
    return () => clearTimeout(timer);
  }, [error, success]);

  const changePasswordHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5500/api/user/updatepassword",
        {
          method: "POST",
          body: JSON.stringify({
            userid: ctx.user.id,
            currentpassword: currentPasswordRef.current.value,
            newpassword: newPasswordRef.current.value,
            repeatpassword: confirmPasswordRef.current.value,
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
        setSuccess("Password Updated Successfully");
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmPasswordRef.current.value = "";
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
          {success}
        </Alert>
      )}
      <div className={`marginleft ${Styles["student-settings"]}`}>
        <h3>Account Settings</h3>
        <div
          className={`${Styles["student-settings__form"]} ${Styles["student-settings_content"]} `}
        >
          <div className={Styles["form-content"]}>
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter Your Current Password"
              ref={currentPasswordRef}
            />
          </div>
          <div className={Styles["form-content"]}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter Your New Password"
              ref={newPasswordRef}
            />
          </div>
          <div className={Styles["form-content"]}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Your New Password"
              ref={confirmPasswordRef}
            />
          </div>
          <div className={Styles["form-content-button"]}>
            <button
              className="user-login__button"
              type="submit"
              onClick={changePasswordHandler}
            >
              Change Password
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
    </React.Fragment>
  );
};

export default StudentSettings;
