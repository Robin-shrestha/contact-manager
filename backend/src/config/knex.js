import knex from "knex";
import directory from "./directory.js";

import dotenv from "dotenv";

dotenv.config({
  path: `${directory.root}/.env`,
});

const config = {
  client: process.env.DB_CLIENT || "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  debug: true,
};

const database = knex(config);

export default database;
