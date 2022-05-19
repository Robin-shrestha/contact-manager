import axios from "axios";

import { JWT_TOKEN, API_URL } from "../constants/constants";
import { getLocalStorage } from "./storage";

export const httpBase = () => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${getLocalStorage(JWT_TOKEN)}`,
    },
    responseType: "json",
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  return api;
};
