import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Input from "../components/input";
import InputBoxValue from "../components/input-box-value";
import SelectInput from "../components/input-select";
import TableHeader from "../components/table-header";
import TableRowStatic from "../components/table-row-static";
const ipL = "http://192.168.1.105:3500";
export default function CourierOut() {
  const [addedMat, setAddMat] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [addClientClass, setAddClientClass] = useState("class-hidden");
  const [addBtnContent, setAddBtnContent] = useState("New");
  const [fileUploadClass, setFileUploadClass] = useState("class-hidden");
  const [image, setImage] = useState();

  useEffect(() => {
    let tempClient = [];
    axios.get(`${ipL}/courier/client_list`).then((response) => {
      //console.log(response.data);
      response.data.map((cl) => {
        tempClient.push(cl.client_nm);
      });

      setClientList(tempClient);
    });
  }, []);

  let addBtnClick = () => {
    setAddClientClass("");
    //setAddBtnContent("Cls");
  };
  let handleClick = () => {
    let old = [...addedMat];
    let cur = [...addedMat];
    //console.log(addedMat);
    let nmat = document.getElementById("materialNameInput").value;
    let nuom = document.getElementById("materialUOMInput").value;
    let nqty = document.getElementById("materialQtyInput").value;
    let str = { mat: nmat, uom: nuom, qty: nqty };
    //cur.push(str);
    //console.log(cur);
    cur.push(str);
    setAddMat(cur);
    clearForm();
    //console.log(cur);
    //console.log(addedMat);
    addedMat.map((mat, idx) => {
      //console.log(addedMat[idx]);
    });
    //return cur;
  };

  let updateFileUploadClass = () => {
    if (
      document.getElementById("courierDateInput").value != "" &&
      document.getElementById("sentBy").value != "" &&
      document.getElementById("recpName").innerHTML != ""
    ) {
      setFileUploadClass("");
    } else {
      setFileUploadClass("class-hidden");
    }
  };
  let onImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  let onImgBtnClick = () => {
    if (
      document.getElementById("courierDateInput").value == "" ||
      document.getElementById("sentBy").value == "" ||
      document.getElementById("recpName").innerHTML == ""
    ) {
      alert("Incomplete Details Provided");
    }
  };

  let submitData = () => {
    if (image === null) {
      alert("Please Attach Document.");
    }
    const data = new FormData();
    //console.log(image);
    data.append("courier_out_img", image);

    let file_name =
      document.getElementById("recpName").value +
      "_" +
      document.getElementById("awbInput").value;
    data.append("file_name", file_name);
    //console.log(image.name.split(".")[image.name.split(".").length - 1]);
    console.log(file_name);
    let materialData = [];
    let materialRowArr = document.getElementsByClassName("table-row");
    //console.log(materialRowArr[0].children[0].innerHTML);

    for (let row of materialRowArr) {
      materialData.push({
        material_nm: row.children[0].innerHTML,
        material_uom: row.children[1].innerHTML,
        material_qty: row.children[2].innerHTML,
      });
    }
    let formData;
    try {
      formData = {
        formDate: document.getElementById("courierDateInput").value,
        sent_by: document.getElementById("sentBy").value,
        recepient_nm: document.getElementById("recpName").value,
        awb: document.getElementById("awbInput").value,
        courier_nm: document.getElementById("courierPartner").value,
        img_link: `192.168.1.105:3500/courier_out/images/${
          file_name +
          "." +
          image.name.split(".")[image.name.split(".").length - 1]
        }`,
        formDtlData: materialData,
      };
    } catch (error) {
      console.log("Cannot Initialise form data.");
      alert("Cannot Initialise form data.");
      return 0;
    }

    //console.log(formData.formImage);
    //const { formDate, sent_by, sender_nm, awb, courier_nm, img_link }
    try {
      axios.post(`${ipL}/courier_out/update`, formData).then((response) => {
        console.log(response.data.message);
        console.log(response.data.error);
        if (response.status === 400) {
          alert(response.data.message);
        } else if (response.status === 200) {
          alert(response.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
    axios.post(`${ipL}/courier_out/imageUpload`, data).then((response) => {
      if (response.status === 400) {
        console.log("Critical Error Occurred");
      }
    });
  };

  function clearForm() {
    document.getElementById("materialNameInput").value = "";
    document.getElementById("materialUOMInput").value = "";
    document.getElementById("materialQtyInput").value = "";
  }

  return (
    <div className="billScreen" onChange={updateFileUploadClass}>
      <div>
        <div className="initEntry">
          <div className="screen-header">Courier Out</div>
          <div>
            <div className="form-group-1">
              <Input
                id="courierDateInput"
                name="Date"
                for="date"
                type="date"
                placeholder="dd/mm/yyyy"
              />
              <Input
                name="Sender Name"
                for="text"
                type="text"
                placeholder="Name"
                id="sentBy"
              />
              <SelectInput
                id="recpName"
                list={clientList}
                name="Recepient Party"
              />
            </div>

            <div className="form-group-1.5">
              <Button
                type="button"
                id="addNewClientButton"
                value={addBtnContent}
                onClickFunc={addBtnClick}
              />
              <InputBoxValue
                classA={addClientClass}
                id="newSenderInput"
                for="text"
                type="text"
                placeholder="New Sender"
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
          class={fileUploadClass}
          type="file"
          id="uploadImage"
          onChangeFunc={onImageChange}
          onClickFunc={onImgBtnClick}
        />
      </div>
      <div className="compEntry">
        <div className="typematerialList">
          <TableHeader
            heads={["Material", "UOM", "Qty"]}
            flexG={[{ flexGrow: 0.4 }, { flexGrow: 0 }, { flexGrow: 0 }]}
          />
          <div className="material-rows">
            {addedMat.map((mat) => {
              return (
                <TableRowStatic
                  matName={mat.mat}
                  uom={mat.uom}
                  qty={mat.qty}
                  id={mat}
                />
              );
            })}
          </div>
        </div>

        <Button
          type="button"
          id="submitBill"
          value="Submit Bill"
          onClickFunc={submitData}
        />
      </div>
    </div>
  );
}

function uploadImage() {}

let genSenderList = () => {
  let arr = ["Create New"];
  axios.get(`${ipL}/courier/client_list`).then((response) => {
    console.log(response.data.map);
  });
  return arr;
};

/* function addItem() {
    const currentAr = addedMat;
    let temp = [
      "GENERAL CEMENT ROLL WHITE;ROLL;20",
      "MACHINERY TOOLS RGR CLOTH (EMRY BELT)G-36 TO 320 -;PCS;20",
      "CHEMICALS REPLAN RV -;LTR;20",
      "ADHESIVE 999 (25 LTR) -;LTR;20",
      "CHEMICALS HARDENER C;LTR;20",
      "ADHESIVE HENKEL PU 6100 -;LTR;20",
      "CHEMICALS HENKEL 007 WITH POWDER -;LTR;20",
      "ADHESIVE HENKEL PU 6100 -;LTR;20",
    ];
    let mat = document.getElementById("materialNameInput").value;
    let uom = document.getElementById("materialUOMInput").value;
    let qty = document.getElementById("materialQtyInput").value;
    let str = mat + ";" + uom + ";" + qty;
    if (str == ";;") {
      return 0;
    }
    currentAr.push(str);
    //addedMat.push(currentAr);
    setAddMat(currentAr);
    console.log(currentAr);
    console.log(addedMat);
    document.getElementById("materialNameInput").value = "";
    document.getElementById("materialUOMInput").value = "";
    document.getElementById("materialQtyInput").value = "";
  }
*/

/**
  * function handleClick() {
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
    //return cur;
  }

  let td;

  let matData = [
    "GENERAL CEMENT ROLL WHITE;ROLL;20",
    "MACHINERY TOOLS RGR CLOTH (EMRY BELT)G-36 TO 320 -;PCS;20",
    "CHEMICALS REPLAN RV -;LTR;20",
    "ADHESIVE 999 (25 LTR) -;LTR;20",
    "CHEMICALS HARDENER C;LTR;20",
    "ADHESIVE HENKEL PU 6100 -;LTR;20",
    "CHEMICALS HENKEL 007 WITH POWDER -;LTR;20",
    "ADHESIVE HENKEL PU 6100 -;LTR;20",
  ];

  return (
    <div className="billScreen">
      <div>
        <div className="initEntry">
          <div className="screen-header">Courier Out</div>
          <div>
            <div className="form-group-1">
              <Input
                name="Date"
                for="date"
                type="date"
                placeholder="dd/mm/yyyy"
              />
              <Input
                name="Sender Name"
                for="text"
                type="text"
                placeholder="Name"
                id="sentBy"
              />
              <SelectInput
                id="recpName"
                list={genSenderList()}
                name="Recepient Name"
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
          onClickFunc={() => handleClick()}
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
              (td = () => {
                let c = addedMat;
                let t = [];
                addedMat.map((m) => {
                  t.push(
                    <TableRowStatic matName={m.mat} uom={m.uom} qty={m.qty} />
                  );
                });
                console.log(t);
                return t;
              })
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

  */
