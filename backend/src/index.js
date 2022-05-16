import express from "express";
import routes from "./routes/index.js";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import database from "./config/knex.js";
import directory from "./config/directory.js";

dotenv.config({
  path: `${directory.root}/.env`,
});

const app = express();
const port = 8000;

// TODO
// authentication
// File handeling(cloud storages)
// services

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/v1", routes);

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
  // database("table_name")
  //   .select()
  //   .then((res) => {
  //     console.log(res);
  //   });
});
