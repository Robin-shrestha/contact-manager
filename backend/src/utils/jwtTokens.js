import jwt from "jsonwebtoken";

import moment from "moment";
import Boom from "@hapi/boom";

const { sign, verify, decode, TokenExpiredError, JsonWebTokenError } = jwt;

/**
 * Generate token
 *
 * @param {Object} payload
 * @param {Integer} expires in minutes
 * @param {String} [secret]
 * @returns {String}
 */
export const generateToken = (
  payload,
  expires = 100,
  secret = process.env.JWT_SECRET
) => {
  const options = {
    iat: moment().unix(),
    exp: moment().add(expires, "s").unix(),
  };
  const signOptions = { ...options, ...payload };
  return sign(signOptions, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {String} token
 * @returns {Promise<Token>}
 */
export const verifyToken = (token) => {
  if (!token) {
    throw Boom.forbidden("No token provided.");
  }
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw Boom.badRequest("Token has expired.");
    }
    if (err instanceof JsonWebTokenError) {
      throw Boom.badRequest(
        "You are not authorized to perform this operation."
      );
    }
    throw err;
  }
};

/**
 * Decode token and return token (or null if token is invalid)
 * @param {String} token
 * @returns {Promise<Token>}
 */
export const decodeToken = (token) => {
  if (!token) {
    throw Boom.forbidden("Token not found.");
  }
  return decode(token, { complete: true });
};

/**
 * decode JWT token from request header and return decoded token
 * @param {object} headers
 * @returns {object}
 */
export const getTokenPayloadFromRequestHeader = (headers) => {
  const token = headers.authorization.split(" ")[1];
  const decodedToken = decodeToken(token);
  return decodedToken.payload;
};
