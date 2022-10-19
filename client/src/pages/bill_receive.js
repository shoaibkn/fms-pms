import React, { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import SelectInput from "../components/input-select";
import TableHeader from "../components/table-header";
import TableRow from "../components/table-row";
import "../index.css";
import axios from "axios";
import { resolvePath } from "react-router-dom";
export default function BillReceive() {
  const [poStore, setPoStore] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  //useEffect Hook to fetch supplier names
  useEffect(() => {
    //make api call to server to fetch all suppliers
    axios
      .get("http://localhost:3500/bill_receive/supplier_list")
      .then((response) => {
        if (!response) {
          alert("Critical Error No response Received!!");
        } else {
          setSupplierList(response.data);
          //console.log(genSupList);
        }
      });
  }, []);
  let td = [];
  useEffect(() => {
    materialList.forEach((m, i) =>
      td.push(
        <TableRow
          matName={materialList[i][0]}
          uom={materialList[i][1]}
          type="number"
          placeholder={materialList[i][2]}
        />
      )
    );
  }, [materialList]);

  let fetchMaterials = () => {
    let supplierName = document.getElementById("supName").value;
    axios
      .post("/bill_receive/material_list", {
        supplierName: supplierName,
        store_po: poStore,
      })
      .then((response) => {
        console.log(response.data[0]);
        //setMaterialList(response.data)
      });
  };

  const storeList = [
    "Grinderies",
    "Lasting",
    "Chemical",
    "Sample",
    "Leather",
    "General",
  ];
  let addPO = () => {
    let storename = document.getElementById("storeName").value;
    let st;
    switch (storename) {
      case "Grinderies":
        st = "GS";
        break;
      case "Lasting":
        st = "LAS";
        break;
      case "Chemical":
        st = "CS";
        break;
      case "Leather":
        st = "LS";
        break;
      case "General":
        st = "GES";
        break;
      case "Sample":
        st = "SS";
        break;
      default:
        st = "";
    }
    let ponumber = document.getElementById("poNum").value;
    let stringData;
    stringData = st + "_" + ponumber;

    let existingData = poStore;
    if (st === "default" || ponumber === "") {
      alert("No Data Selected");
      return;
    }
    if (stringData === "undefined_") {
      stringData = "";
    }
    if (stringData === "No PO/Store Selected") {
      setPoStore("");
    }

    if (existingData === "_") {
      existingData = "";
    }
    if (existingData === "") {
      setPoStore(stringData);
    } else {
      setPoStore(existingData + "; " + stringData);
    }

    document.getElementById("storeName").value = "";
    document.getElementById("poNum").value = "";
  };

  return (
    <div className="billScreen">
      <div>
        <div className="initEntry">
          <div className="screen-header">Bill Receive Form</div>
          <div>
            <div className="form-group-1">
              <Input
                name="Date"
                for="date"
                type="date"
                placeholder="dd/mm/yyyy"
              />
              <Input
                name="Bill Number"
                for="number"
                type="number"
                placeholder="Bill Number"
                id="billNum"
              />
              <SelectInput
                id="supName"
                list={supplierList}
                name="Supplier Name"
              />
            </div>
            <div className="form-group-2">
              <SelectInput id="storeName" list={storeList} name="Store Name" />
              <Input
                id="poNum"
                name="PO Number"
                for="po-number"
                type="number"
                placeholder="Enter PO"
              />
              <Button
                type="button"
                id="poAddButton"
                value="Add"
                onClickFunc={addPO}
              />
            </div>
          </div>
          <div className="form-group-3">
            <div>
              <h3>Selected POs</h3>
              <p id={"sel-po"}>{poStore}</p>
            </div>
            <Button
              type="button"
              id="fetchMaterialBtn"
              value="Fetch Materials"
              onClickFunc={fetchMaterials}
            />
          </div>
        </div>
        <div className="typematerialList">
          <TableHeader
            heads={["Material", "UOM", "Qty"]}
            flexG={[{ flexGrow: 0.4 }, { flexGrow: 0 }, { flexGrow: 0 }]}
          />
          <div className="material-rows">{td}</div>
        </div>
        <Button
          type="button"
          id="uploadImage"
          value="Upload Image"
          onClickFunc={uploadImage}
        />
      </div>

      <div className="billImage">
        <img className="billImageSRC"></img>
        <Button
          type="button"
          id="submitBill"
          value="Submit Bill"
          onClickFunc={submitBill}
        />
      </div>
    </div>
  );
}

function submitBill() {
  alert("Button CLicked");
}

function uploadImage() {}

//function to fetch materials

let genSupList = (data) => {
  let supLi = [];
  for (let i in data) {
    let { SUPPLIER } = i;
    //console.log(SUPPLIER);
  }
  //console.log(supLi);
  return supLi;
};
