import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import database from "./config/knex.js";
import directory from "./config/directory.js";
import errorhandler from "./middlewares/errorhandlers.js";

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
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
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

app.use(cors(corsOptions));

app.get("/testing", (req, res) => {
  res.json({ message: "testing" });
});

// routes
app.use("/v1", routes);

// error handong
app.use(errorhandler);

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
  // database("table_name")
  //   .select()
  //   .then((res) => {
  //     console.log(res);
  //   });
});
