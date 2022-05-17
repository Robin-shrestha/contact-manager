import express from "express";
import * as authController from "../controller/auth.controller.js";
import Boom from "@hapi/boom";

import database from "../config/knex.js";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";

import initializePassport from "../middlewares/passportConfig.js";

initializePassport(
  passport,
  async (email) => {
    try {
      const user = await database("users").select().where("email", email);
      if (!user.length) return null;

      return user[0];
    } catch (error) {
      throw Boom.internal(error.message);
    }
  },
  async (id) => {
    try {
      const user = await database("users")
        .select("username", "email", "id")
        .where("id", id);
      if (!user.length) return null;
      return user[0];
    } catch (error) {
      throw Boom.internal(error.message);
    }
  }
);
const router = express.Router();

// passport.use(
//   new LocalStrategy(async (email, password, done) => {
//     console.log({ email, password });
//     const user = await database("users").select().where("email", email);
//     console.log("🚀 ~ file: auth.controller.js ~ line 12 ~ user", user);

//     if (!user.length) {
//       return done(null, false);
//     }
//     if (!(await bcrypt.compare(password, user.password))) {
//       return done(null, false);
//     }

//     return done(null, user);
//   })
// );

router
  .route("/login")
  .post(passport.authenticate("local"), authController.login);

router.route("/register").post(authController.register);

export default router;
