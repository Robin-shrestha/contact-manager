import * as Yup from "yup";
import * as stringConst from "../constants/strings";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, stringConst.TOO_SHORT)
    .max(50, stringConst.TOO_LONG)
    .required(stringConst.REQUIRED),
  email: Yup.string()
    .email(stringConst.INVALID_FORMAT)
    .required(stringConst.REQUIRED),
});

export default loginSchema;
