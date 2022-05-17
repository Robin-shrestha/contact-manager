import express from "express";

import auth from "./auth.js";
import users from "./users.js";
import contacts from "./contacts.js";

import authMiddlewares from "../middlewares/passportConfig.js";

const router = express.Router();

// passport.use(
//   "local",
//   new LocalStrategy({ usernameField: "email" }, authenticateUser)
// );

// passport.serializeUser((user, done) => done(null, user.id));

// passport.use(
//   "jwt",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     async (payload, done) => {
//       try {
//         console.log("🚀 ~ file: index.js ~ line 59 ~ payload", payload);
//         return done(null, payload);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

router.use("/users", users);
router.use("/contacts", authMiddlewares.passportJWT, contacts);
router.use("/auth", auth);

export default router;
