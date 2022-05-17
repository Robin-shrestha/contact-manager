import express from "express";
import * as authController from "../controller/auth.controller.js";

import passport from "passport";

const router = express.Router();

router
  .route("/login")
  .post(passport.authenticate("local"), authController.login);

router.route("/register").post(authController.register);

export default router;
