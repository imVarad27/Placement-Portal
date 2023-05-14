import React, { useCallback, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import LoginPage from "./pages/LoginPage";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./components/context/auth-context";
import StudentSidebar from "./components/StudentPage/StudentSidebar";
import StudentProfile from "./components/StudentPage/StudentProfile";
import ViewCompany from "./components/Company/ViewCompany";
import CompanyRegister from "./components/StudentPage/StudentComponents/CompanyRegister";
import StudentMain from "./components/StudentPage/StudentMain";
import StudentHome from "./components/StudentPage/StudentHome";
import Announcement from "./components/Announcement/Announcement";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import CreateDrive from "./components/Admin/CreateDrive/CreateDrive";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AppliedStudents from "./components/Admin/AppliedStudents/AppliedStudents";
import StudentSettings from "./components/StudentPage/StudentSettings";
import EligibleStudents from "./components/Admin/EligibleStudents/EligibleStudents";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState(null);

  const login = useCallback((userObject) => {
    setIsLoggedIn(true);
    setUser(userObject);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const userTypeHandler = useCallback((type) => {
    setUserType(type);
  }, []);

  let adminRoutes;
  let userRoutes;
  let routes;
  if (isLoggedIn && userType === "admin") {
    adminRoutes = (
      <React.Fragment>
        <StudentSidebar userType={"admin"} />
        <Switch>
          <Route path="/admin" exact>
            <AdminHome />
          </Route>
          <Route path="/admin/create/" exact>
            <CreateDrive />
          </Route>
          <Route path="/admin/dashboard/" exact>
            <Dashboard />
          </Route>
          <Route path="/admin/company/:id/" exact>
            <ViewCompany />
          </Route>
          <Route path="/admin/company/:id/eligible/" exact>
            <EligibleStudents />
          </Route>
          <Route path="/admin/company/:id/applied/" exact>
            <AppliedStudents />
          </Route>
        </Switch>
        <Redirect to="/admin" exact />
      </React.Fragment>
    );
  }
  if (isLoggedIn && userType === "student") {
    userRoutes = (
      <React.Fragment>
        <StudentSidebar userType={"student"} />
        <StudentProfile />
        <Switch>
          <Route path="/student" exact>
            <StudentHome />
          </Route>
          <Route path="/student/profile" exact>
            <StudentMain />
          </Route>
          <Route path="/student/cregister/" exact>
            <CompanyRegister />
          </Route>
          <Route path="/student/company/:id/" exact>
            <ViewCompany />
          </Route>
          <Route path="/student/settings/" exact>
            <StudentSettings />
          </Route>
          <Route path="/student/annoucements/" exact>
            <Announcement />
          </Route>
        </Switch>
        <Redirect to="/student" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <Welcome />
          </Route>
          <Route path="/login/student/" exact>
            <LoginPage user={"student"} />
          </Route>
          <Route path="/login/admin/" exact>
            <LoginPage user={"admin"} />
          </Route>
          <Route path="/register/student" exact>
            <RegisterPage />
          </Route>
        </Switch>
        <Redirect to="/" />
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        userType: userType,
        userTypeHandler: userTypeHandler,
        user: user,
      }}
    >
      <Router>
        <Navbar />
        <Switch>
          {isLoggedIn && userType === "admin" ? adminRoutes : routes}
          {isLoggedIn && userType === "student" ? userRoutes : routes}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
