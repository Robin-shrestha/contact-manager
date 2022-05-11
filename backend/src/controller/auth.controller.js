const login = (req, res, next) => {
  try {
    res.send("login!");
  } catch (error) {
    next(error);
  }
};

const register = (req, res, next) => {
  try {
    res.send("register");
  } catch (error) {
    next(error);
  }
};

export { login, register };
