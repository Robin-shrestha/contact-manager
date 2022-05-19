import dotenv from "dotenv";

import app from "./config/express.js";
import routes from "./routes/index.js";
import directory from "./config/directory.js";
import errorhandler from "./middlewares/errorhandlers.js";

dotenv.config({
  path: `${directory.root}/.env`,
});

const port = process.env.PORT;
const host = process.env.HOST;

// TODO
// File handeling(cloud storages)

// routes
app.use("/v1", routes);

// error handling
app.use(errorhandler);

app.listen(port, host, () => {
  console.log(`${host}:${port}`);
});
