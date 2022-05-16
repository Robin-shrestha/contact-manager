import { useFormik } from "formik";
import { Link } from "react-router-dom";

import Input from "../common/Input";
import FormError from "../common/FormError";
import Button from "../common/button/Button";
import loginSchema from "../../schemas/login";

import "./style.css";

const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
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
            <div className="pb-3">
              <Input
                id="email"
                name={"email"}
                placeholder={"Enter your email"}
                onChange={(value) => formik.setFieldValue("email", value)}
                value={formik.values.username}
                width="250px"
                wrapperWidth="250px"
                label={"email"}
                className="login-input"
              />
              <FormError
                error={formik.errors.email}
                touched={formik.touched.email}
              />
            </div>
            <div className="pb-3">
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
              <FormError
                error={formik.errors.password}
                touched={formik.touched.password}
              />
            </div>

            <div className="form-btn-container">
              <Button
                className="form-btn"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                LOGIN
              </Button>
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
