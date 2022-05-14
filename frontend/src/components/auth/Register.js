import { useFormik } from "formik";
import { Link } from "react-router-dom";

import Input from "../common/Input";
import FormError from "../common/FormError";
import Button from "../common/button/Button";
import Datepicker from "../common/datepicker";
import RadioButtons from "../common/radioButton";
import registerSchema from "../../schemas/register";
import { genderOptions } from "../../constants/options";

import "./style.css";

const layout = {
  wrapperWidth: "100%",
  width: "100%",
};

const Register = (props) => {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      phone: "",
      address: "",
      email: "",
      date_of_birth: undefined,
      gender: "",
      profile_pic: null,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(
        "🚀 ~ file: Register.js ~ line 16 ~ Register ~ values",
        values
      );
    },
  });
  const { errors, touched } = formik;

  return (
    <div id="loginform" className="auth-container">
      <div className="register-body">
        <h3>Register</h3>
        <div className="register-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 lg:col-span-2 pb-3">
                <Input
                  id="full_name"
                  name={"full_name"}
                  placeholder={"enter full name"}
                  onChange={(value) => formik.setFieldValue("full_name", value)}
                  value={formik.values.full_name}
                  {...layout}
                  label={"full name"}
                />
                <FormError
                  error={errors.full_name}
                  touched={touched.full_name}
                />
              </div>

              <div className="col-span-2 lg:col-span-1 pb-3">
                <Input
                  id="profile_pic"
                  name={"profile_pic"}
                  placeholder={"Profile Picture"}
                  onChange={(value) =>
                    formik.setFieldValue("profile_pic", value)
                  }
                  value={formik.values.profile_pic}
                  {...layout}
                  label={"profile pic"}
                />
                <FormError
                  error={errors.profile_pic}
                  touched={touched.profile_pic}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 lg:col-span-2 pb-3">
                <RadioButtons
                  required
                  id="gender"
                  name={"gender"}
                  placeholder={"gender"}
                  onChange={(value) => formik.setFieldValue("gender", value)}
                  value={formik.values.gender}
                  {...layout}
                  options={genderOptions}
                  label={"Gender"}
                />
                <FormError error={errors.gender} touched={touched.gender} />
              </div>
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Datepicker
                  required
                  id="date_of_birth"
                  name={"date_of_birth"}
                  placeholder={"date of birth"}
                  onChange={(value) =>
                    formik.setFieldValue("date_of_birth", value)
                  }
                  value={formik.values.date_of_birth}
                  {...layout}
                  label={"date of birth"}
                />
                <FormError
                  error={errors.date_of_birth}
                  touched={touched.date_of_birth}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Input
                  id="phone"
                  name={"phone"}
                  placeholder={"phone"}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  value={formik.values.phone}
                  {...layout}
                  label={"phone"}
                />
                <FormError error={errors.phone} touched={touched.phone} />
              </div>
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Input
                  id="email"
                  name={"email"}
                  placeholder={"email"}
                  onChange={(value) => formik.setFieldValue("email", value)}
                  value={formik.values.email}
                  {...layout}
                  label={"email"}
                />
                <FormError error={errors.email} touched={touched.email} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Input
                  id="address"
                  name={"address"}
                  placeholder={"address"}
                  onChange={(value) => formik.setFieldValue("address", value)}
                  value={formik.values.address}
                  {...layout}
                  label={"address"}
                />
                <FormError error={errors.address} touched={touched.address} />
              </div>
            </div>

            <div className="form-btn-container">
              <Button className="form-btn">Sign Up</Button>
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
