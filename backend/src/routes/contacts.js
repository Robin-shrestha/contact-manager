import express from "express";
import storage from "../config/multer.js";

import * as contactController from "../controller/contacts.controller.js";

const router = express.Router();

router
  .route("/")
  .get(contactController.getContacts)
  .post(storage.single("profile_pic"), contactController.createContact);

router
  .route("/:id")
  .put(storage.single("profile_pic"), contactController.updateContact)
  .get(contactController.getContact)
  .delete(contactController.deleteContact);

export default router;
