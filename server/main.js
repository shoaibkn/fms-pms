const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Users } = require("./models");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Vrd@1234",
  database: "vrd_app",
});

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
/*
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username : " + username);
  console.log("Password : " + password);
  db.execute(
    "SELECT passwd, module_ids FROM authn_db where username = ? and passwd = ?",
    [username, password],
    (err, result) => {
      let hash = bcrypt.hash(password, 1);
      console.log(hash);
      if (err) {
        res.send({ err: err });
        res.send("Username/Password Incorrect");
      }
      if (result.length > 0) {
        if (bcrypt.compare(password, result[0].passwd)) {
          console.log("Logged in");
          res.send("Logged in");
        }
        //res.send(modGen(result[0].module_ids));
        //console.log(modGen(result[0].module_ids));
      } else ({ message: "Wrong Username or password!" });
    }
  );
});*/

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    console.log("User Not Found");
    res.status(400).json({ error: "User not found" });
  }
  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res.status(400).json({ error: "Incorrect Username/Password" });
    } else {
      res.status(200).json({ message: "User AUthenticated" });
    }
  });
});

/*
app.post("/login", (req, res) => {
  //const username = req.body.username;
  //const password = req.body.password;
  db.execute(
    "SELECT module_ids FROM authn_db where username = 'admin' and passwd = 'admin'",

    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log(err);
      }
      if (result.length > 0) {
        res.send(modGen(result[0].module_ids));
        console.log(modGen(result[0].module_ids));
      } else ({ message: "Wrong Username or password!" });
    }
  );
});*/

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
