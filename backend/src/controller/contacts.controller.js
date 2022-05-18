import moment from "moment";
import Boom from "@hapi/boom";

// import dbx, { accessToken, appKey, appsecret } from "../config/dropbox.js";

import axios from "axios";
import database from "../config/knex.js";

const data = JSON.stringify({ limit: 1000 });

const getContacts = async (req, res, next) => {
  try {
    const { query, userId } = req;

    const contactRes = await database("contacts")
      .select(
        "id",
        "is_favroite",
        "full_name",
        "email",
        "gender",
        "profile_pic",
        "mobile_number",
        "home_number",
        "work_number",
        "address",
        "date_of_birth"
      )
      .where("user_id", userId)
      .whereLike("full_name", `%${query.search_key || ""}%`)
      .orderBy("is_favroite", "desc")
      .orderBy("full_name", "asc");

    res.status(200).json({ success: true, data: contactRes });
  } catch (error) {
    const err = Boom.badRequest(error.message.split("-")?.[1] || "Bad Request");
    next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { params, userId } = req;

    const [data] = await database("contacts")
      .select(
        "id",
        "is_favroite",
        "full_name",
        "email",
        "gender",
        "profile_pic",
        "mobile_number",
        "home_number",
        "work_number",
        "address",
        "date_of_birth"
      )
      .where("user_id", userId)
      .where("id", params.id);
    if (!data) {
      throw Boom.notFound("id not found!");
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    if (Boom.isBoom(error)) {
      return next(error);
    }
    const err = Boom.badRequest(error.message.split("-")?.[1] || "Bad Request");
    next(err);
  }
};

const axiosRequest = (endpoint, data, extraheaders = {}) => {
  const root = "https://api.dropboxapi.com/2";

  axios
    .post(`https://content.dropboxapi.com/2/files/upload`, data, {
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: `Bearer ${accessToken}`,
        "Dropbox-API-Arg": JSON.stringify({
          autorename: true,
          mode: "add",
          mute: false,
          path: "/",
          strict_conflict: false,
        }),
      },
      // auth: {
      //   username: appKey,
      //   password: appsecret,
      // },
    })
    .then((res) => console.log("res", res.data))
    .catch((err) => console.log("error", err.response.data));
};

const createContact = async (req, res, next) => {
  try {
    // TODO file
    const { file, body, userId } = req;

    const [addRes] = await database("contacts")
      .insert({
        user_id: userId,
        email: body.email,
        full_name: body.full_name,
        gender: body.gender,
        profile_pic: body.profile_pic,
        mobile_number: body.home_no,
        home_number: body.home_no,
        work_number: body.work_no,
        is_favroite: body.is_favorite,
        address: body.address,
        date_of_birth: body.date_of_birth,
        created_at: moment().format("YYYY-MM-DD"),
      })
      .returning(["id", "email", "full_name"]);

    res.status(201).json({
      success: true,
      message: "Contacts added successfully!",
      ...addRes,
    });
  } catch (error) {
    const err = Boom.badData(error.message.split("-")?.[1] || "Bad Data");
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    // TODO file
    const { file, body, userId, params } = req;

    const [data] = await database("contacts")
      .where("user_id", userId)
      .where("id", params.id)
      .update({
        email: body.email,
        full_name: body.full_name,
        gender: body.gender,
        profile_pic: body.profile_pic,
        mobile_number: body.home_no,
        home_number: body.home_no,
        work_number: body.work_no,
        is_favroite: body.is_favorite,
        address: body.address,
        date_of_birth: body.date_of_birth,
        updated_at: moment().format("YYYY-MM-DD"),
      })
      .returning(["id", "email", "full_name"]);

    if (!data) {
      throw Boom.notFound("id not found!");
    }

    res.status(202).json({
      success: true,
      message: "Contacts updated successfully!",
      ...data,
    });
  } catch (error) {
    if (Boom.isBoom(error)) {
      return next(error);
    }
    const err = Boom.badRequest(error.message.split("-")?.[1] || "Bad Request");

    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { userId, params } = req;

    await database("contacts")
      .where("user_id", userId)
      .where("id", params.id)
      .delete();

    res.status(204).json({ success: true });
  } catch (error) {
    const err = Boom.badRequest(error.message.split("-")?.[1] || "Bad Request");
    next(err);
  }
};

export { getContact, createContact, deleteContact, getContacts, updateContact };
