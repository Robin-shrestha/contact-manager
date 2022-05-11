import express from "express";

import * as contactController from "../controller/contacts.controller.js";

const router = express.Router();

router
  .route("/")
  .get(contactController.getContacts)
  .post(contactController.createContact);

router
  .route("/:id")
  .put(contactController.updateContact)
  .get(contactController.getContact)
  .delete(contactController.deleteContact);

export default router;
