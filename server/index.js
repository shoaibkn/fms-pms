const express = require("express");
const app = express();

app.listen(3001);

app.get("/", (req, res) => {
  console.log("Here");
  res.send("hh");
});

/**
 * get
 * post
 * put
 * delete
 * patch
 */
