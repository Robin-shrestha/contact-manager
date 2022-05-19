import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import NotFound from "../common/NotFound";
import ContactDetails from "./ContactDetails";
import { AuthContext } from "../common/authProvider/AuthProvider";
import { DEFAULT } from "../../constants/strings";
import Button from "../common/button";

const ContactsRouting = (props) => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/contacts/list" replace />} />

        <Route path="list" element={<ContactList />} />
        <Route path=":id/details" element={<ContactDetails />} />
        <Route path="add" element={<ContactForm />} />
        <Route path=":id/edit" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Button
        customType={DEFAULT}
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ContactsRouting;
