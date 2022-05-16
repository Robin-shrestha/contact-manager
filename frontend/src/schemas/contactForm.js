import * as Yup from "yup";
import * as regexPatterns from "../constants/patterns";
import * as stringConst from "../constants/strings";
import { genderOptions } from "../constants/options";

const contactFormSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, stringConst.TOO_SHORT)
    .max(50, stringConst.TOO_LONG)
    .required(stringConst.REQUIRED),
  address: Yup.string()
    .min(2, stringConst.TOO_SHORT)
    .max(50, stringConst.TOO_LONG)
    .required(stringConst.REQUIRED),
  work_no: Yup.string()
    .min(6, stringConst.TOO_SHORT)
    .max(16, stringConst.TOO_LONG)
    .matches(regexPatterns.phoneNumber, stringConst.INVALID_FORMAT)
    .nullable(true)
    .optional(true),
  home_no: Yup.string()
    .min(6, stringConst.TOO_SHORT)
    .max(16, stringConst.TOO_LONG)
    .matches(regexPatterns.phoneNumber, stringConst.INVALID_FORMAT)
    .nullable(true)
    .optional(true),
  mobile_no: Yup.string()
    .min(6, stringConst.TOO_SHORT)
    .max(16, stringConst.TOO_LONG)
    .matches(regexPatterns.phoneNumber, stringConst.INVALID_FORMAT)
    .required(stringConst.REQUIRED),
  email: Yup.string()
    .email(stringConst.INVALID_FORMAT)
    .required(stringConst.REQUIRED),
  date_of_birth: Yup.string().nullable(true).required(stringConst.REQUIRED),
  profile_pic: Yup.object().nullable(true), //TODO thi should be string tat gives the location in the cloud drive
  gender: Yup.string()
    .oneOf(genderOptions.map((item) => item.value))
    .required(stringConst.REQUIRED),
});

export default contactFormSchema;
