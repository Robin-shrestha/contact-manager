import Boom from "@hapi/boom";
import database from "../config/knex.js";

const getUserByEmail = async (email) => {
  try {
    const user = await database("users").select().where("email", email);
    if (!user.length) return null;

    return user[0];
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await database("users")
      .select("username", "email", "id")
      .where("id", id);
    if (!user.length) return null;
    return user[0];
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const userServices = { getUserByEmail, getUserById };

export default userServices;
