import bcrypt from "bcrypt";
import Boom from "@hapi/boom";
import passportLocal from "passport-local";
import jwtPassportStrategy from "passport-jwt";
import passport from "passport";

import userServices from "../services/user.service.js";

const ExtractJwt = jwtPassportStrategy.ExtractJwt;
const JWTstrategy = jwtPassportStrategy.Strategy;
const LocalStrategy = passportLocal.Strategy;
const { getUserByEmail, getUserById } = userServices;

function initialize() {
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

  passport.use(
    "local",
    new LocalStrategy({ usernameField: "email" }, authenticateUser)
  );

  passport.use(
    "jwt",
    new JWTstrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        passReqToCallback: true,
      },
      async (req, token, done) => {
        try {
          const user = await getUserById(token.user);
          req.user = user;
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    let user = await getUserById(id);
    return done(null, user);
  });
}

initialize();

const authMiddlewares = {
  passportJWT: async (req, res, next) => {
    await passport.authenticate(
      "jwt",
      { session: true },
      function (err, userId, info) {
        if (info && info.name === "Error") {
          let Err = Boom.badRequest(info.message);
          return next(Err);
        }
        if (info && info.name === "TokenExpiredError") {
          let Err = Boom.badRequest(info.message);
          return next(Err);
        }
        if (info && info.name === "JsonWebTokenError") {
          let Err = Boom.badRequest(info.message);
          return next(Err);
        }

        if (err) {
          return next(err);
        }

        req.userId = userId;
        next();
      }
    )(req, res, next);
  },
};
export default authMiddlewares;
