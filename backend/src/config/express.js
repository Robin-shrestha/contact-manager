import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import corsOptions from "./cors.js";
import bodyParser from "body-parser";
import directory from "./directory.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
  path: `${directory.root}/.env`,
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy
app.use(cors(corsOptions));

app.get("/ping", (req, res) => {
  res.json({ message: "ping" });
});

export default app;
