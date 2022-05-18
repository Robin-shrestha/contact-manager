import * as Yup from "yup";
import * as regexPatterns from "../constants/patterns";
import * as stringConst from "../constants/strings";
import { genderOptions } from "../constants/options";

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, stringConst.TOO_SHORT)
    .max(50, stringConst.TOO_LONG)
    .required(stringConst.REQUIRED),
  password: Yup.string()
    .min(2, stringConst.TOO_SHORT)
    .max(50, stringConst.TOO_LONG)
    .required(stringConst.REQUIRED),
  email: Yup.string()
    .email(stringConst.INVALID_FORMAT)
    .required(stringConst.REQUIRED),
});

export default registerSchema;
