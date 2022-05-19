import { store, fetch, destroy, update } from "../utils/http";
import { toast } from "react-toastify";

export const getContacts = async (search_key) => {
  try {
    const res = await fetch("contacts", { params: { search_key } });
    if (res.data?.success) {
      return res.data.data;
    }
    throw new Error("error");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.response.statusText || "error"
    );
    throw error.response.data;
  }
};
