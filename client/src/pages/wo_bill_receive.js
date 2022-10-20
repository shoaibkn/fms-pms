import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button";
import Input from "../components/input";
import InputBoxValue from "../components/input-box-value";
import SelectInput from "../components/input-select";
import TableHeader from "../components/table-header";
import TableRow from "../components/table-row";
export default function WOBillReceive() {
  const [poStore, setPoStore] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => {
    //make api call to server to fetch all suppliers
    axios
      .get("http://192.168.1.105:3500/bill_receive/supplier_list")
      .then((response) => {
        if (!response) {
          alert("Critical Error No response Received!!");
        } else {
          setSupplierList(response.data);
          //console.log(genSupList);
        }
      });
  }, []);

  let fetchMaterials = () => {
    let supplierName = document.getElementById("supName").value;
    axios
      .post("/bill_receive/wo_material_list", {
        supplierName: supplierName,
        store_po: poStore,
      })
      .then((response) => {
        console.log(response.data.rows);
        setMaterialList(response.data.rows);
        console.log(response.data.rows);
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
  //populate this array with Data on fetch Materials
  let matData = [
    ["GENERAL CEMENT ROLL WHITE", "ROLL"],
    ["MACHINERY TOOLS RGR CLOTH (EMRY BELT)G-36 TO 320 -", "PCS"],
    ["CHEMICALS REPLAN RV -", "LTR"],
    ["ADHESIVE 999 (25 LTR) -", "LTR"],
    ["CHEMICALS HARDENER C", "LTR"],
    ["ADHESIVE HENKEL PU 6100 -", "LTR"],
    ["CHEMICALS HENKEL 007 WITH POWDER -", "LTR"],
    ["ADHESIVE HENKEL PU 6100 -", "LTR"],
  ];

  function addPO() {
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
        break;
    }
    //let ponumber = document.getElementById("poNum").value;
    let stringData;
    stringData = st;

    let existingData = poStore;
    if (st === "" || st === "undefined") {
      alert("No Data Selected");
      return;
    }
    if (stringData === "undefined") {
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
    //document.getElementById("poNum").value = "";
  }

  let tableData = () => {
    let dd = [];
    for (let i = 0; i < matData.length; i++) {
      dd.push(
        <TableRow matName={matData[i][0]} uom={matData[i][1]} type="number" />
      );
    }
    return dd;
  };

  let td = [];
  matData.forEach((m, i) =>
    td.push(
      <TableRow matName={matData[i][0]} uom={matData[i][1]} type="number" />
    )
  );

  let onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="billScreen">
      <div>
        <div className="initEntry">
          <div className="screen-header">Without PO Bill Receive Form</div>
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
              <h3>Selected Stores</h3>
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
          <div className="material-rows">
            {materialList.map((mat, idx) => (
              //console.log(idx);
              <TableRow
                matName={mat.NOMEN1}
                uom={mat.UNIT_NM}
                qty={mat.BAL_QTY}
                key={idx}
              />
            ))}
          </div>
        </div>
        <div className="billAmountInput">
          <span>Enter Bill Amount</span>
          <InputBoxValue />
        </div>
        <Button type="file" id="uploadImage" onChangeFunc={onImageChange} />
      </div>

      <div className="billImage">
        <img className="billImageSRC" src={image}></img>
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
function fetchMaterials() {}
function genSupList() {
  let arr = [
    "Supplier 1",
    "Supplier 2",
    "Supplierdsadsadasdasdsdasds 3",
    "Supplier 4",
    "Supplier 5",
    "Supplier 6",
  ];
  return arr;
}
