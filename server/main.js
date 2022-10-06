const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "build", "index.html"));
  let user = "admin";
  let pass = "admin";
  res.send(authn(user, pass));
});

app.listen("3500");

function authn(user, pass) {
  if (user === "admin" && pass === "admin") {
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
}
