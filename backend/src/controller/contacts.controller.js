const getContacts = (req, res, next) => {
  try {
    res.send("get Contacts!");
  } catch (error) {
    next(error);
  }
};

const getContact = (req, res, next) => {
  try {
    res.send("get Contact details!");
  } catch (error) {
    next(error);
  }
};

const createContact = (req, res, next) => {
  try {
    res.send("createContact!");
  } catch (error) {
    next(error);
  }
};

const updateContact = (req, res, next) => {
  try {
    res.send("updateContact!");
  } catch (error) {
    next(error);
  }
};

const deleteContact = (req, res, next) => {
  try {
    res.send("deleteContact!");
  } catch (error) {
    next(error);
  }
};

export { getContact, createContact, deleteContact, getContacts, updateContact };
