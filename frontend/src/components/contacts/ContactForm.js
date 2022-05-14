import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import Input from "../common/Input";
import FormError from "../common/FormError";
import Button from "../common/button/Button";
import Datepicker from "../common/datepicker";
import RadioButtons from "../common/radioButton";
import registerSchema from "../../schemas/register";
import Uploader from "../common/FileUpload/Uploader";
import { genderOptions } from "../../constants/options";
import { acceptImagesTypes } from "../../constants/uploadAcceptTypes";

import "./style.css";

const layout = {
  wrapperWidth: "100%",
  width: "100%",
  wrapperClassName: "input-component-wrapper",
  className: "input-component",
};
const ContactForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      full_name: "",
      mobile_no: "",
      home_no: "",
      work_no: "",
      address: "",
      email: "",
      date_of_birth: undefined,
      gender: "",
      profile_pic: null,
    },
    // validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(
        "🚀 ~ file: Register.js ~ line 16 ~ Register ~ values",
        values
      );
      // navigate("/contacts");
    },
  });

  const { errors, touched } = formik;

  return (
    <div className="contact-container">
      <div
        className="contact-body"
        // style={{ backgroundColor: "white", color: "black" }}
      >
        <div className="contacts-form">
          <div className="text-center mb-8">
            <h3 style={{ fontSize: "2em", color: "black" }}>Add Contact</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 lg:col-span-2 pb-3">
                <Input
                  id="full_name"
                  name={"full_name"}
                  placeholder={"Enter Full Name"}
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

              <div className="col-span-2 lg:col-span-2 pb-3">
                <Uploader
                  id="profile_pic"
                  name={"profile_pic"}
                  placeholder={"Profile Picture"}
                  onChange={(value) =>
                    formik.setFieldValue("profile_pic", value)
                  }
                  value={formik.values.profile_pic}
                  {...layout}
                  label={"profile pic"}
                  accept={acceptImagesTypes}
                />
                <FormError
                  error={errors.profile_pic}
                  touched={touched.profile_pic}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Input
                  id="mobile_no"
                  name={"mobile_no"}
                  placeholder={"Mobile Number"}
                  onChange={(value) => formik.setFieldValue("mobile_no", value)}
                  value={formik.values.mobile_no}
                  {...layout}
                  label={"Mobile Number"}
                />
                <FormError
                  error={errors.mobile_no}
                  touched={touched.mobile_no}
                />
              </div>
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Input
                  id="home_no"
                  name={"home_no"}
                  placeholder={"Home Number"}
                  onChange={(value) => formik.setFieldValue("home_no", value)}
                  value={formik.values.home_no}
                  {...layout}
                  label={"Home Number"}
                />
                <FormError error={errors.home_no} touched={touched.home_no} />
              </div>
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Input
                  id="work_no"
                  name={"work_no"}
                  placeholder={"Work Number"}
                  onChange={(value) => formik.setFieldValue("work_no", value)}
                  value={formik.values.work_no}
                  {...layout}
                  label={"Work Number"}
                />
                <FormError error={errors.work_no} touched={touched.work_no} />
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
              <Button customType={"EDIT"} className="">
                EDIT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
