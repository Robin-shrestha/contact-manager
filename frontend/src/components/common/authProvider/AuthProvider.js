import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  API_URL,
  JWT_TOKEN,
  LOGGED_IN_USER,
  USER_FULL_NAME,
} from "../../../constants/constants";

import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../../../utils/storage";

import { isAuthenticated } from "../../../utils/jwt";

export const AuthContext = createContext({});

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(getLocalStorage(USER_FULL_NAME) || {});
  const [authErrors, setAuthErrors] = useState();
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated() || false
  );

  const state = { user, authenticated, authErrors };

  const login = ({ email, password }) => {
    return axios
      .post(API_URL + "/auth/login", { email, password })
      .then((response) => {
        console.log(
          "🚀 ~ file: AuthProvider.js ~ line 31 ~ .then ~ response",
          response
        );
        setLocalStorage(JWT_TOKEN, response.data.jwt_token);
        setLocalStorage(USER_FULL_NAME, response.data.username);
        setLocalStorage(LOGGED_IN_USER, response.data.user);
        setAuthenticated(true);
        navigate("/contacts");
        return response;
      })
      .catch((err) => {
        setAuthErrors(err?.response?.data?.message);
      });
  };

  const logout = () => {
    clearLocalStorage(JWT_TOKEN);
    clearLocalStorage(LOGGED_IN_USER);
    clearLocalStorage(USER_FULL_NAME);
    setUser({});
    setAuthErrors();
    setAuthenticated(false);
    navigate("/");
    window.location.reload();
  };
  return (
    <AuthContext.Provider
      {...props}
      value={{
        ...state,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
