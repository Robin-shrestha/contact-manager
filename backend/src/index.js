import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = 8000;

// app.get("/", (req, res) => {
//   res.send("Hello Worasdlasdd!");
// });

app.use("/v1", routes);

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
