const express = require("express");

const app = express();
const port = 81;

app.use(function (req, res, next) {
  console.log("${new Date()} - ${req.method} request for ${req.url}");
  next();
});

app.use(express.static("../static"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
