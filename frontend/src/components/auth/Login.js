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
    <div id="loginform" className="login-container">
      <div className="login-body">
        <h3>Login</h3>
        <div className="login-form">
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="username"
              name={"username"}
              placeholder={"Enter your username"}
              onChange={formik.handleChange}
              value={formik.values.username}
              width="250px"
              wrapperWidth="250px"
              label={"Username"}
            />
            <Input
              id="password"
              name={"password"}
              placeholder={"Enter your Password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              wrapperWidth="250px"
              width="250px"
              label={"Password"}
              type="password"
            />

            <div className="login-form-btn-container">
              <Button
                onClick={() => {
                  formik.handleSubmit();
                }}
                // customType={buttonTypes.ADD}
                className="login-btn"
              >
                DEFAULT
              </Button>
            </div>
          </form>
        </div>
        <p className="login-footer">
          Need ad Account! <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
