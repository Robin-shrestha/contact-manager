// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import Boom from "@hapi/boom";

const LocalStrategy = passportLocal.Strategy;

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user === null) {
      return done(Boom.unauthorized("username or password incorrect"), false);
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(Boom.unauthorized("username or password incorrect"), false);
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    let user = await getUserById(id);
    console.log(
      "🚀 ~ file: passportConfig.js ~ line 33 ~ passport.deserializeUser ~ user",
      user
    );
    return done(null, user);
  });
}

export default initialize;
