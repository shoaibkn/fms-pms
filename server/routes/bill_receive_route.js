/*import {
  fetchMaterialsfunc,
  supplierListfunc,
} from "../middleware/bill_receive_apis";
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen("3500", () => {
  console.log("Server Running");
});

app.post("/bill_receive", async (req, res) => {
  res.send(supplierListfunc());
});
*/
