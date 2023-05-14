import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./UserLogin.css";
import ImagePath from "../../assets/LoginImageArt.svg";
import { AuthContext } from "../context/auth-context";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";

const UserLogin = (props) => {
  const ctx = useContext(AuthContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 1200);
    return () => clearTimeout(timer);
  }, [error]);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [authorized, setAuthorized] = useState(false);

  const buttonSubmitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      authorized: false,
    };

    if (props.userRole === "student") {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5500/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            prn: userData.email,
            password: userData.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
        } else {
          const data = await response.json();
          const user = data.user;
          ctx.login(user);
          ctx.isLoggedIn = true;
          ctx.userTypeHandler("student");
          ctx.userType = "student";
          userData.authorized = true;
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    } else if (props.userRole === "admin") {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5500/api/admin/login", {
          method: "POST",
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
        } else {
          const data = await response.json();
          const admin = data.admin;
          ctx.login(admin);
          ctx.isLoggedIn = true;
          ctx.userTypeHandler("admin");
          ctx.userType = "admin";
          userData.authorized = true;
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
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
        <div className="wrapper">
          <img src={ImagePath} alt="Login Image" />
          <form className="login" autoComplete="on">
            <h2>
              Welcome, {props.userRole === "student" ? "Student" : "Admin"}!
            </h2>
            <p>Please log in</p>
            <input
              type="text"
              placeholder={props.userRole === "student" ? "PRN" : "Email"}
              ref={emailRef}
              autoComplete={props.userRole === "student" ? "PRN" : "Email"}
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              autoComplete="current-password"
            />

            <button
              className="user-login__button"
              type="submit"
              onClick={buttonSubmitHandler}
            >
              Log in
            </button>
            <div className="links">
              <Link to="/">Forgot password ?</Link>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserLogin;
