import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { buttonTypes } from "../../constants/strings";
import Button from "../common/button/Button";

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
    <div id="loginform" className="auth-container">
      <div className="login-body">
        <h3>Login</h3>
        <div className="login-form">
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="username"
              name={"username"}
              placeholder={"Enter your username"}
              onChange={(value) => formik.setFieldValue("username", value)}
              value={formik.values.username}
              width="250px"
              wrapperWidth="250px"
              label={"Username"}
              className="login-input"
            />
            <Input
              id="password"
              name={"password"}
              placeholder={"Enter your Password"}
              onChange={(value) => formik.setFieldValue("password", value)}
              value={formik.values.password}
              wrapperWidth="250px"
              width="250px"
              label={"Password"}
              className="login-input"
              type="password"
            />

            <div className="form-btn-container">
              <Button className="form-btn">LOGIN</Button>
            </div>
          </form>
        </div>
        <p className="footer">
          Need an Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
