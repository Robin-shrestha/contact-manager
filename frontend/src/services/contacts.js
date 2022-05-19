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

export const getContact = async (id) => {
  try {
    const res = await fetch(`contacts/${id}`);

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

export const addContact = async (formdata) => {
  try {
    const res = await store(`contacts`, formdata, {
      headers: {
        "content-type": " multipart/form-data",
      },
    });

    if (res.data?.success) {
      toast.success(res?.data?.message || "contact added successfully");
      return res.data;
    }
    throw new Error("error");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.response.statusText || "error"
    );
  }
};

export const editContact = async (formdata, id) => {
  try {
    const res = await update(`contacts/${id}`, formdata, {
      headers: {
        "content-type": " multipart/form-data",
      },
    });

    if (res.data?.success) {
      toast.success(res?.data?.message || "contact updated successfully");
      return res.data;
    }
    throw new Error("error");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.response.statusText || "error"
    );
  }
};

export const deletContact = async (id) => {
  try {
    const res = await destroy(`contacts/${id}`);

    toast.success(res?.data?.message || "contact deleted successfully");
    return res;
    throw new Error("error");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.response.statusText || "error"
    );
  }
};
