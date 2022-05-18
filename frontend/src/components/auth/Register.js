import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import Input from "../common/Input";
import FormError from "../common/FormError";
import Button from "../common/button/Button";
import registerSchema from "../../schemas/register";
import { register } from "../../services/auth";

import "./style.css";

const layout = {
  wrapperWidth: "100%",
  width: "100%",
};

const Register = (props) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register(values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {});
    },
  });

  return (
    <div id="loginform" className="auth-container">
      <div className="register-body">
        <h3>Register</h3>
        <div className="register-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="pb-3">
              <Input
                id="email"
                name={"email"}
                placeholder={"Enter your email"}
                onChange={(value) => formik.setFieldValue("email", value)}
                value={formik.values.email}
                {...layout}
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
                id="username"
                name={"username"}
                placeholder={"Enter your username"}
                onChange={(value) => formik.setFieldValue("username", value)}
                value={formik.values.username}
                {...layout}
                label={"username"}
                className="login-input"
              />
              <FormError
                error={formik.errors.username}
                touched={formik.touched.username}
              />
            </div>
            <div className="pb-3">
              <Input
                id="password"
                name={"password"}
                placeholder={"Enter your Password"}
                onChange={(value) => formik.setFieldValue("password", value)}
                value={formik.values.password}
                {...layout}
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
                onClick={() => {
                  formik.handleSubmit();
                }}
                className="form-btn"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
        <p className="footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
