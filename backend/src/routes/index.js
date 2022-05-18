import express from "express";

import auth from "./auth.js";
import users from "./users.js";
import contacts from "./contacts.js";

import authMiddlewares from "../middlewares/passportConfig.js";

const router = express.Router();

router.use("/users", users);
router.use("/contacts", authMiddlewares.passportJWT, contacts);
router.use("/auth", auth);

export default router;
