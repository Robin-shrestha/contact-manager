import path from "path";
import moment from "moment";
import Boom from "@hapi/boom";

import database from "../config/knex.js";
import directory from "../config/directory.js";
import { uploadFile, getFileUrl } from "../services/google.service.js";

const data = JSON.stringify({ limit: 1000 });

const getContacts = async (req, res, next) => {
  try {
    const { query, userId } = req;

    const contactRes = await database("contacts")
      .select("id", "is_favroite", "full_name", "profile_pic", "mobile_number")
      .where("user_id", userId)
      .whereILike("full_name", `%${query.search_key || ""}%`)
      .orderBy("is_favroite", "desc")
      .orderBy("full_name", "asc");

    for (let i = 0; i < contactRes.length; i++) {
      try {
        let urlRes = await getFileUrl(contactRes[i].profile_pic);
        contactRes[i].profile_pic = urlRes.data.thumbnailLink;
      } catch (error) {
        contactRes[i].profile_pic = null;
      }
    }

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

    if (data.profile_pic) {
      let urlRes = await getFileUrl(data.profile_pic);

      data.profile_pic = urlRes.data.thumbnailLink;
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

const createContact = async (req, res, next) => {
  try {
    const { file, body, userId } = req;
    const filePath = path.join(directory.root, file.path);
    const googleRes = await uploadFile(filePath);

    const [addRes] = await database("contacts")
      .insert({
        user_id: userId,
        email: body.email,
        full_name: body.full_name,
        gender: body.gender,
        profile_pic: googleRes.data.id || "image.jpeg",
        mobile_number: body.mobile_no,
        home_number: body.home_no || null,
        work_number: body.work_no || null,
        is_favroite: body.is_favorite,
        address: body.address || null,
        date_of_birth: body.date_of_birth || null,
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
    const { file, body, userId, params } = req;

    let googleRes;
    if (file) {
      const filePath = path.join(directory.root, file.path);
      googleRes = await uploadFile(filePath);
    }

    const [data] = await database("contacts")
      .where("user_id", userId)
      .where("id", params.id)
      .update({
        email: body.email,
        full_name: body.full_name,
        gender: body.gender,
        profile_pic: googleRes?.data?.id,
        mobile_number: body.mobile_no,
        home_number: body.home_no || null,
        work_number: body.work_no || null,
        is_favroite: body.is_favorite,
        address: body.address || null,
        date_of_birth: body.date_of_birth || null,
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
    const err = Boom.badRequest(
      error.message.split("-").slice(1).join("-") || "Bad Request"
    );

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
