import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import NotFound from "../common/NotFound";

const ContactsRouting = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts/list" replace />} />

      <Route path="list" element={<ContactList />} />
      <Route path="details" element={<ContactDetails />} />
      <Route path="add" element={<ContactForm />} />
      <Route path="edit" element={<ContactForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ContactsRouting;
