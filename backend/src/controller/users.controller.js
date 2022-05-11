const getUsers = (req, res, next) => {
  try {
    res.send("get users!");
  } catch (error) {
    next(error);
  }
};

const getUser = (req, res, next) => {
  try {
    res.send("get user details!");
  } catch (error) {
    next(error);
  }
};

const createUser = (req, res, next) => {
  try {
    res.send("createUser!");
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res, next) => {
  try {
    res.send("updateUser!");
  } catch (error) {
    next(error);
  }
};

const deleteUser = (req, res, next) => {
  try {
    res.send("deleteUser!");
  } catch (error) {
    next(error);
  }
};

export { getUser, createUser, deleteUser, getUsers, updateUser };
