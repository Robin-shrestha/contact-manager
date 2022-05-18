import authServices from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwtTokens.js";

const login = (req, res, next) => {
  try {
    const token = generateToken(
      {
        ...req.session.passport,
        email: req.user.email,
        username: req.user.username,
      },
      60 * 60,
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "User successfully logged in",
      ...req.session.passport,
      email: req.user.email,
      username: req.user.username,
      jwt_token: token,
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

const logout = async (req, res, next) => {
  try {
    // TODO
    req.logout();
    console.log(req.session);
    res.status(200).json({ message: "logged out successfully", ...user });
  } catch (error) {
    next(error);
  }
};

export { login, register, logout };
