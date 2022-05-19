import dotenv from "dotenv";

import directory from "./directory.js";

dotenv.config({
  path: `${directory.root}/.env`,
});

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(";")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

export default corsOptions;
