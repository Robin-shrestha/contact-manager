import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import moment from "moment";
import Input from "../common/Input";
import FormError from "../common/FormError";
import Button from "../common/button/Button";
import Datepicker from "../common/datepicker";
import RadioButtons from "../common/radioButton";
import Uploader from "../common/FileUpload/Uploader";
import { DATE_FORMAT } from "../../constants/constants";
import { genderOptions } from "../../constants/options";
import contactFormSchema from "../../schemas/contactForm";
import { ADD, CANCEL, DEFAULT, EDIT } from "../../constants/strings";
import { acceptImagesTypes } from "../../constants/uploadAcceptTypes";
import {
  addContact,
  deletContact,
  editContact,
  getContact,
} from "../../services/contacts";

import "./style.css";

const layout = {
  wrapperWidth: "100%",
  width: "100%",
  wrapperClassName: "input-component-wrapper",
  className: "input-component",
};

const initialValue = {
  full_name: "",
  mobile_no: "",
  home_no: "",
  work_no: "",
  address: "",
  email: "",
  date_of_birth: undefined,
  gender: "",
  profile_pic: null,
  is_favorite: false,
};

const ContactForm = () => {
  const params = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: editMode ? initialValue : initialValue, //Todo
    validationSchema: contactFormSchema,
    onSubmit: (values) => {
      console.log(
        "🚀 ~ file: ContactForm.js ~ line 59 ~ ContactForm ~ values",
        values
      );
      const bodyFormData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          bodyFormData.append(key, value);
        }
      });

      if (editMode) {
        onEditContact(bodyFormData);
      } else {
        onAddContact(bodyFormData);
      }
    },
  });

  const onAddContact = (values) => {
    addContact(values).then((res) => {
      res && navigate("/contacts");
    });
  };

  const onEditContact = (values) => {
    editContact(values, params?.id).then((res) => {
      res && navigate(`/contacts/${params.id}/details`);
    });
  };
  const onDeleteContact = () => {
    deletContact(params?.id).then((res) => {
      console.log(
        "🚀 ~ file: ContactForm.js ~ line 87 ~ deletContact ~ res",
        res
      );
      navigate("/contacts");
    });
  };

  useEffect(() => {
    if (location.pathname.endsWith("edit")) {
      setEditMode(true);

      getContact(params?.id)
        .then((res) => {
          formik.setValues({
            full_name: res.full_name,
            mobile_no: res.mobile_number,
            home_no: res.home_number,
            work_no: res.work_number,
            address: res.address,
            email: res.email,
            date_of_birth: res.date_of_birth
              ? moment(res.date_of_birth).format(DATE_FORMAT)
              : null,
            gender: res.gender,
            profile_pic: res.profile_pic,
            is_favorite: !!res.is_favroite,
          });
        })
        .catch((err) => {});
    } else {
      setEditMode(false);
    }
    return () => {};
  }, []);

  const { errors, touched } = formik;

  return (
    <div className="contact-container">
      <div className="contact-body">
        <div className="contacts-form">
          <div className="text-center mb-8">
            <h3 style={{ fontSize: "2em", color: "black" }}>
              {editMode ? <>Edit Contact</> : <>Add Contact</>}
            </h3>
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
                  required
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
                  required
                />
                <FormError
                  error={errors.profile_pic}
                  touched={touched.profile_pic}
                />
              </div>
            </div>
            <div>
              <div className="input-field-container my-4">
                <label
                  style={{
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Favorite
                  <input
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    className="mx-4"
                    type="checkbox"
                    checked={formik.values.is_favorite}
                    onClick={(e) => {
                      formik.setFieldValue("is_favorite", e.target.checked);
                    }}
                  />
                </label>
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
                  required
                  type={"number"}
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
                  type={"number"}
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
                  type={"number"}
                />
                <FormError error={errors.work_no} touched={touched.work_no} />
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
                  required
                />
                <FormError error={errors.email} touched={touched.email} />
              </div>
              <div className="col-span-2 lg:col-span-2 pb-3">
                <RadioButtons
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
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 lg:col-span-1 pb-3 ">
                <Datepicker
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
              {editMode ? (
                <>
                  <Button
                    customType={EDIT}
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    className=""
                  >
                    EDIT
                  </Button>
                  <Button
                    onClick={onDeleteContact}
                    customType={CANCEL}
                    className=""
                  >
                    DELETE
                  </Button>
                </>
              ) : (
                <Button
                  customType={ADD}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  className=""
                >
                  ADD
                </Button>
              )}

              <Button
                customType={DEFAULT}
                onClick={() => {
                  editMode
                    ? navigate(`/contacts/${params?.id}/details`)
                    : navigate(`/contacts/list`);
                }}
                className=""
              >
                BACK
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
