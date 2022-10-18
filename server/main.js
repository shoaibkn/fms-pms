const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
//const AuthnDbModel = require("./models/authn_db");
const db = require("./models");
const models = require("./models");
const Users = db.Users;
//app.use(express.static(path.join(__dirname, "build")));
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

app.get("/", (req, res) => {
  res.send("backend working");
  console.log(res);
});

app.listen("3500", () => {
  console.log("Server Running");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    db.execute(
      "INSERT INTO authn_db (username, passwd, module_ids) VALUES (?,?,501)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    console.log("User Not Found");
    res.status(400).json({ error: "User not found" });
  }
  const dbPassword = user.passwd;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res.status(400).json({ error: "Incorrect Username/Password" });
      console.log({ error: "Incorrect Username/Password" });
    } else {
      res.status(200).json({ message: "User AUthenticated" });
      console.log({ message: "User Authenticated" });
    }
  });
});
const modGen = (mod_id) => {
  if (mod_id == 501) {
    return (mod_list = [
      "Bill Receive Form",
      "W/O Bill Receive Form",
      "Courier In",
      "Courier Out",
      "Bill Transfer Note",
      "Bill Receive Note",
      "GRN Tasks",
      "Store Tasks",
      "Accounts Tasks",
      "Pending Bills Report",
      "Material Quality Feedback",
      "Quality Passing/Rejection",
      "Quality Feedback Report",
      "PO To Delivery FMS",
      "Order To PO FMS",
      "Projection Email",
      "Pending Material For PO Report",
      "Pending Material For Projection",
      "Order To Collection FMS",
      "Tasks",
      "Pending Tasks Report",
    ]);
  }
  //return status accepted and an array of all user modules
};

db.sequelize.sync().then(() => {
  app.listen(3501, () => {
    console.log("SERVER RUNNING ON PORT 3501");
  });
});
