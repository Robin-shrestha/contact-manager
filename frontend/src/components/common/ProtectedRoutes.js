import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../../utils/jwt";
import { AuthContext } from "./authProvider/AuthProvider";

const ProtectedRoutes = ({ children }) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    !isAuthenticated() && logout();
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
