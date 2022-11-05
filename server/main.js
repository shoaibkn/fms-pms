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
//const models = require("./models");
const AuthnDbModel = db.authn_db_model;
const BillRecv = db.BillRecvModel;
const { createToken, validateToken } = require("./JWT");
const {
  fetchMaterialsfunc,
  supplierListfunc,
  fetchMaterialsWOfunc,
  BillUpdate,
} = require("./middleware/bill_receive_apis");
//app.use(express.static(path.join(__dirname, "build")));

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("backend working");
  //console.log(res);
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
  const user = await AuthnDbModel.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User not found", message: "User not found" });
    console.log("User Not Found");

    return 0;
  }
  const dbPassword = user.passwd;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res.json({
        error: "Incorrect Username/Password",
        message: "Incorrect Username/Password",
      });
      console.log({ error: "Incorrect Username/Password" });
    } else {
      const accessToken = createToken({
        username: user.username,
        module_list: modGen(user.module_ids),
      });

      //uncomment below code to generate session using cookie
      res.cookie("access-token", accessToken, {
        message: "User Authenticated",
        maxAge: 60 * 60 * 4,
        domain: "http://192.168.1.105:3000",
      });

      res
        .status(200)
        .json({ token: accessToken, message: "User Authenticated" });
      console.log({ message: "User Authenticated" });
    }
  });
});

app.get("/profile", (req, res) => {
  console.log(req.cookie);
  //var data = req.headers.cookie;
});

app.get("/dashboard", validateToken, (req, res) => {
  var data = req.headers.cookie;

  console.log(data.split("; "));
  res.json({ sessionStatus: true, mod_list: modGen(501) });
});

app.get("/bill_receive/supplier_list", async (req, res) => {
  res.json(await supplierListfunc());
  //console.log(await supplierListfunc());
});

app.post("/bill_receive/material_list", async (req, res) => {
  const { supplierName, store_po } = req.body;
  //console.log(supplierName);
  //console.log(store_po);
  const matData = await fetchMaterialsfunc(supplierName, store_po);
  if (matData.message === "Materials not Found" || matData.message === [[]]) {
    res.json(matData.message);
    //console.log(matData);
  } else {
    res.json(matData);
  }
  //console.log(matData);
});

app.post("/bill_receive/wo_material_list", async (req, res) => {
  const { supplierName, store_po } = req.body;
  //console.log(supplierName);
  //console.log(store_po);
  const matData = await fetchMaterialsWOfunc(supplierName, store_po);
  res.json(matData);
  //console.log(matData);
});

app.get("/bill_receive/lastID", async (req, res) => {
  const ids = await BillRecv.findAll({
    attributes: ["bill_id"],
  });
  console.log(ids);
  res.send(ids);
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

app.post("/bill_receive/updateBill", async (req, res) => {
  const { billArr, billDtlArr, multStore } = req.body;
  let update = await BillUpdate(req);
  console.log(update.message);
  if (update.message === "success") {
    return res.status(200).json({ message: "Records Updated" });
  } else {
    return res.status(400).json({ message: update.message });
  }
});

db.sequelize.sync().then(() => {
  app.listen(3501, () => {
    console.log("SERVER RUNNING ON PORT 3501");
  });
});
