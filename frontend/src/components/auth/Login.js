import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../common/Input";

import "./style.css";

const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("🚀 ~ file: Login.js ~ line 16 ~ Login ~ values", values);
    },
  });

  return (
    <div id="loginform" className="login-container" style={{}}>
      <div className="login-body" style={{}}>
        <h3>Login</h3>
        <div className="login-form">
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="username"
              name={"username"}
              placeholder={"Enter your username"}
              onChange={formik.handleChange}
              value={formik.values.username}
              // width="300px"
              label={"Username"}
            />
            <Input
              id="password"
              name={"password"}
              placeholder={"Enter your Password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              // width="300px"
              label={"Password"}
              type="password"
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => {
                  formik.handleSubmit();
                }}
                className="login-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <p style={{ textAlign: "center" }}>
          Need ad Account!{" "}
          <Link to="/register" style={{ fontWeight: "700", cursor: "pointer" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
