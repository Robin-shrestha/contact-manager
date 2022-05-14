import React from "react";

const FormError = ({ error, touched }) => {
  return error && touched ? <div className="error">{error}</div> : null;
};

export default FormError;
