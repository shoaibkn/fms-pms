import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Input from "../components/input";
import InputBoxValue from "../components/input-box-value";
import SelectInput from "../components/input-select";
import TableHeader from "../components/table-header";
import TableRowStatic from "../components/table-row-static";
export default function CourierIn() {
  const [addedMat, setAddMat] = useState([]);

  useEffect(() => {
    setAddMat(handleClick());
  }, []);

  let handleClick = () => {
    let cur = addedMat;
    //console.log(addedMat);
    let nmat = document.getElementById("materialNameInput").value;
    let nuom = document.getElementById("materialUOMInput").value;
    let nqty = document.getElementById("materialQtyInput").value;
    let str = { mat: nmat, uom: nuom, qty: nqty };
    //cur.push(str);
    //console.log(cur);
    cur.push(str);
    setAddMat(cur);
    console.log(addedMat);
    return cur;
  };

  return (
    <div className="billScreen">
      <div>
        <div className="initEntry">
          <div className="screen-header">Courier In</div>
          <div>
            <div className="form-group-1">
              <Input
                name="Date"
                for="date"
                type="date"
                placeholder="dd/mm/yyyy"
              />
              <Input
                name="Received By"
                for="text"
                type="text"
                placeholder="Name"
                id="recvBy"
              />
              <SelectInput
                id="supName"
                list={genSenderList()}
                name="Sender Name"
              />
            </div>
            <div className="form-group-2">
              <Input
                id="awbInput"
                for="text"
                type="text"
                placeholder="AWB Number"
                name="AWB"
              />
              <Input
                id="courierPartner"
                for="text"
                type="text"
                placeholder="Courier Partner"
                name="Courier Service"
              />
            </div>
          </div>
          <div className="form-group-3"></div>
        </div>
        <div className="typematerialList">
          <TableHeader
            heads={["Material", "UOM", "Qty"]}
            flexG={[{ flexGrow: 0.5 }, { flexGrow: 0 }, { flexGrow: 0 }]}
          />
          <div className="material-rows-single">
            <div className="materialRow">
              <InputBoxValue
                id="materialNameInput"
                for="text"
                type="text"
                placeholder="Enter Material Name"
              />
              <InputBoxValue
                id="materialUOMInput"
                for="text"
                type="text"
                placeholder="Enter UOM"
              />
              <InputBoxValue
                id="materialQtyInput"
                for="number"
                type="number"
                placeholder="Enter Qty"
              />
            </div>
          </div>
        </div>
        <Button
          type="button"
          id="poAddButton"
          value="Add"
          onClickFunc={handleClick}
        />
        <Button
          type="button"
          id="uploadImage"
          value="Upload Image"
          onClickFunc={uploadImage}
        />
      </div>
      <div className="compEntry">
        <div className="typematerialList">
          <TableHeader
            heads={["Material", "UOM", "Qty"]}
            flexG={[{ flexGrow: 0.4 }, { flexGrow: 0 }, { flexGrow: 0 }]}
          />
          <div className="material-rows">
            {
              addedMat.map((mat, idx) => (
                <TableRowStatic
                  matName={mat.mat}
                  uom={mat.uom}
                  qty={mat.qty}
                  id={idx}
                />
              ))
              //<TableRowStatic matName={m.mat} uom={m.uom} qty={m.qty} />
            }
          </div>
        </div>

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

function genSenderList() {
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
