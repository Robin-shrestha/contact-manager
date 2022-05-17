import authServices from "../services/auth.service.js";

const login = (req, res, next) => {
  try {
    res.status(200).json({
      message: "User successfully logged in",
      ...req.session.passport,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await authServices.addUser(req.body);
    res.status(201).json({ message: "User successfully registered", ...user });
  } catch (error) {
    next(error);
  }
};

export { login, register };
