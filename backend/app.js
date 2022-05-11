const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello Worasdld!");
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
