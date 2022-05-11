import express from "express";
import * as userController from "../controller/users.controller.js";
const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:id")
  .put(userController.updateUser)
  .get(userController.getUser)
  .delete(userController.deleteUser);

export default router;
