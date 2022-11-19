const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const multer = require("multer");

const upload = multer({ dest: "./Images/" });
const billRecvUpload = multer({ dest: "./Images/BillRecv" });
const courierInUpload = multer({ dest: "./Images/CourierIn" });
const courierOutUpload = multer({ dest: "./Images/CourierOut" });

// const upload = multer({storage:})
//const AuthnDbModel = require("./models/authn_db");
const db = require("../server/models");
//const models = require("./models");
const AuthnDbModel = db.authn_db_model;
const BillRecv = db.BillRecvModel;
const ClientList = db.client_list_model;
const CourierInModel = db.courier_in_model;
const CourierInDtlModel = db.courier_in_dtl_model;

const CourierOutModel = db.courier_out_model;
const CourierOutDtlModel = db.courier_out_dtl_model;
const { createToken, validateToken } = require("./JWT");
const {
  fetchMaterialsfunc,
  supplierListfunc,
  fetchMaterialsWOfunc,
  BillUpdate,
} = require("./middleware/orc_bill_receive_apis");
//const { createBrotliCompress } = require("zlib");
//const { now } = require("sequelize/types/utils");
//app.use(express.static(path.join(__dirname, "build")));

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bp.json({ limit: "50mb" }));
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/BillImages", express.static("Images"));

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

db.sequelize.sync().then(() => {
  app.listen(3501, () => {
    console.log("SERVER RUNNING ON PORT 3501");
  });
});

app.post("/bill_receive/updateBill", async (req, res) => {
  const { billArr, billDtlArr, multStore } = req.body;
  let update = await BillUpdate(req);
  console.log(update.message);
  if (update.message === "success") {
    return res.status(200).json({ message: "Records Updated" });
  } else {
    console.log(update.message);
    return res.json({ message: update.message });
  }
});

app.post(
  "/bill_receive/uploadImage",
  billRecvUpload.single("bill_image"),
  (req, res, next) => {
    try {
      let fileType = req.file.mimetype.split("/")[1];
      let fileName = req.body.file_name + "." + fileType;
      console.log(req.file);
      console.log("./Images/" + req.file.filename);
      console.log(req.body.file_name);
      fs.rename(`./Images/${req.file.filename}`, `./Images/${fileName}`, () => {
        console.log("File Renamed");
      });
      res.status(200).json({ message: "Image Successfully Updated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }
);

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

//Courier APIs
app.get("/courier/client_list", async (req, res) => {
  let list = await ClientList.findAll({
    attributes: ["client_nm"],
    order: ["client_nm"],
  });
  res.send(list);
  //console.log(list);
});

app.post("/courier_in/update", async (req, res) => {
  const {
    formDate,
    recv_by,
    sender_nm,
    awb,
    courier_nm,
    img_link,
    formDtlData,
    formImage,
  } = req.body;

  console.log(req.body);

  console.log(formImage);
  try {
    let courierInUpdate = await CourierInModel.create({
      date: formDate,
      recv_by: recv_by,
      sender_nm: sender_nm,
      awb: awb,
      courier_nm: courier_nm,
      img: img_link,
    });
    //console.log(courierInUpdate.cid);

    try {
      for (let mData of formDtlData) {
        console.log(mData);
        let courierInDtlUpdate = await CourierInDtlModel.create({
          cid: courierInUpdate.cid,
          material_nm: mData.material_nm,
          material_uom: mData.material_uom,
          material_qty: mData.material_qty,
        });
      }
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "Successfully Updated." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong.. NO changes were made" });
  }
});

app.post(
  "/courier_out/imageUpload",
  courierInUpload.single("courier_out_img"),
  (req, res, next) => {
    try {
      let fileType = req.file.mimetype.split("/")[1];
      let fileName = req.body.file_name + "." + fileType;
      console.log(fileName);
      console.log(req.body);
      console.log("./Images/CourierOut/" + req.file.filename);
      //console.log(req.body.file_name);
      fs.rename(
        `./Images/CourierOut/${req.file.filename}`,
        `./Images/CourierOut/${fileName}`,
        () => {
          console.log("File Renamed");
        }
      );
      res.status(200).json({ message: "Image Successfully Updated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }
);

app.post("/courier_out/update", async (req, res) => {
  const {
    formDate,
    sent_by,
    recepient_nm,
    awb,
    courier_nm,
    img_link,
    formDtlData,
    formImage,
  } = req.body;

  //console.log(req.body);

  console.log(formImage);
  try {
    let courierOutUpdate = await CourierOutModel.create({
      date: formDate,
      sender: sent_by,
      recp_nm: recepient_nm,
      awb: awb,
      courier_nm: courier_nm,
      img: img_link,
    });
    //console.log(courierInUpdate.cid);

    try {
      for (let mData of formDtlData) {
        console.log(mData);
        let courierOutDtlUpdate = await CourierOutDtlModel.create({
          cid: courierOutUpdate.cid,
          material_nm: mData.material_nm,
          material_uom: mData.material_uom,
          material_qty: mData.material_qty,
        });
      }
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "Successfully Updated." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something Went Wrong.. NO changes were made" });
  }
});

app.post(
  "/courier_out/imageUpload",
  courierOutUpload.single("courier_out_img"),
  (req, res, next) => {
    try {
      let fileType = req.file.mimetype.split("/")[1];
      let fileName = req.body.file_name + "." + fileType;
      console.log(fileName);
      console.log(req.body);
      console.log("./Images/CourierOut/" + req.file.filename);
      //console.log(req.body.file_name);
      fs.rename(
        `./Images/CourierOut/${req.file.filename}`,
        `./Images/CourierOut/${fileName}`,
        () => {
          console.log("File Renamed");
        }
      );
      res.status(200).json({ message: "Image Successfully Updated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }
);
