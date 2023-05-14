import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userTypeHandler: () => {},
  userType: "",
  user: null,
});
