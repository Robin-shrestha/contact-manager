import bcrypt from "bcrypt";
import moment from "moment";
import Boom from "@hapi/boom";

import database from "../config/knex.js";

const addUser = async (user) => {
  const { username, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await database("users").select().where("email", email);

  if (data.length) {
    throw Boom.badData("user already exist with that email.");
  }

  let res = await database("users")
    .insert({
      username,
      email,
      password: hashedPassword,
      created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
    })
    .returning(["id", "username", "email"]);

  return res[0];
};

const authServices = { addUser };
export default authServices;
