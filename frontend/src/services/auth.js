import { store } from "../utils/http";
import { toast } from "react-toastify";

export const register = async (values) => {
  try {
    const res = await store("auth/register", values);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "error");
    throw error.response.data;
  }
};
