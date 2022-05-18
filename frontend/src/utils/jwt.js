import jwtDecode from "jwt-decode";

import { getLocalStorage } from "./storage";
import { JWT_TOKEN } from "../constants/constants";

export let isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return false;
  }
};

export let decodeUsername = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub;
  } catch (e) {
    return null;
  }
};

export let getToken = () => {
  return getLocalStorage(JWT_TOKEN);
};

export let isAuthenticated = () => {
  return !!getToken() && !isTokenExpired(getToken());
};

export const getUserType = () => {
  try {
    const token = getToken();
    const decode = jwtDecode(token);
    return decode.type;
  } catch (error) {
    return null;
  }
};

export const getId = () => {
  try {
    const token = getToken();
    const decode = jwtDecode(token);
    return decode.id;
  } catch (error) {
    return null;
  }
};
