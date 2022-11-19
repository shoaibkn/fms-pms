import React, { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import SelectInput from "../components/input-select";
import TableHeader from "../components/table-header";
import TableRow from "../components/table-row";
import "../index.css";
import axios from "axios";
import InputBoxValue from "../components/input-box-value";
const ipL = "http://192.168.1.105:3500"; //change to gloabl IP address in production
export default function WOBillReceive() {
  const [poStore, setPoStore] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [image, setImage] = useState();
  const [upImage, setUpImage] = useState();
  const [fileUploadClass, setFileUploadClass] = useState("class-hidden");

  //useEffect Hook to fetch supplier names
  useEffect(() => {
    //make api call to server to fetch all suppliers
    axios.get(ipL + "/bill_receive/supplier_list").then((response) => {
      if (!response) {
        alert("Critical Error No response Received!!");
      } else {
        setSupplierList(response.data);
        //console.log(genSupList);
      }
    });
  }, []);

  let fileUploadBtnStatus = () => {
    let supplierName = document.getElementById("supName").value;
    let billNum = document.getElementById("billNum").value;
    if (
      !(
        supplierName === undefined ||
        supplierName === "default-val" ||
        supplierName === ""
      ) &&
      !(billNum === undefined || billNum === "")
    ) {
      setFileUploadClass("");
    } else {
      setFileUploadClass("class-hidden");
    }
  };

  let fetchMaterials = () => {
    let supplierName = document.getElementById("supName").value;
    let poStore = document.getElementById("sel-po").innerHTML;
    console.log(supplierName + " : " + poStore);
    if (
      supplierName === "default-val" ||
      supplierName === undefined ||
      poStore === undefined ||
      poStore === ""
    ) {
      alert("Incomplete Details Selected");
      return 0;
    }
    try {
      axios
        .post(ipL + "/bill_receive/wo_material_list", {
          supplierName: supplierName,
          store_po: poStore,
        })
        .then((response) => {
          if (response.data === "Materials not Found") {
            alert("No Materials Found");
          } else {
            console.log(response.data.rows);
            setMaterialList(response.data.rows);
            //console.log(materialList);
          }
          //console.log(response.data[0]);
        });
    } catch (error) {
      //console.log(error);
    }
  };

  const storeList = [
    "Grinderies",
    "Lasting",
    "Chemical",
    "Sample",
    "Leather",
    "General",
    "Packing",
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
      case "Packing":
        st = "PAS";
        break;
      default:
        st = "";
    }
    let stringData;
    stringData = st;

    let existingData = poStore;
    if (st === "default") {
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
    //document.getElementById("poNum").value = "";
  };

  let onImgBtnClick = () => {
    if (
      document.getElementById("supName").value === "default-val" ||
      document.getElementById("supName") === "" ||
      document.getElementById("billNum").value === "" ||
      document.getElementById("billNum").value === undefined
    ) {
      alert("Select Supplier and Bill Number First");
      return 0;
    }
  };

  let onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setUpImage(event.target.files[0]);
      console.log(image);
    }
  };

  let submitBill = () => {
    let detailsPr = [
      {
        bill_num: document.getElementById("billNum").value,
        sup_name: document.getElementById("supName").value,
        bill_date: document.getElementById("billDate").value,
        bill_amt: document.getElementById("bill_amt").value,
      },
    ];

    if (
      detailsPr.bill_num === "" ||
      detailsPr.sup_name === "" ||
      detailsPr.bill_date === "" ||
      detailsPr.bill_amt === ""
    ) {
      alert("Details Incomplete");
      return 0;
    }

    console.log(detailsPr);
    let store_po_arr = poStore.split(";");
    let poArr = [];
    let storeArr = [];
    let uniStoreArr = [];
    let uniPoArr = [];

    store_po_arr.forEach((store_po) => {
      storeArr.push(store_po.split("_")[0].trim());
      //poArr.push(store_po.split("_")[1].trim());
    });
    uniStoreArr = removeDuplicates(storeArr);
    uniPoArr = [];
    console.log(uniStoreArr);
    console.log(uniPoArr);
    let detailsSe = [];

    let selRows = document.getElementsByClassName("row-selected");

    console.log(detailsSe);
    if (uniStoreArr.length === 1) {
      //execute first condition
      console.log("Only one store present");
      for (let mat of selRows) {
        detailsSe.push({
          store_id: uniStoreArr.toString(),
          po_num: uniPoArr.toString(),
          materialName: mat.children[0].innerHTML,
          uom: mat.children[1].innerHTML,
          qty: mat.children[2].value,
        });
      }
    } else if (uniStoreArr > 1) {
      //execute second condition
      console.log("multiple stores present");
      for (let mat of selRows) {
        detailsSe.push({
          store_id: uniStoreArr.toString(),
          po_num: uniPoArr.toString(),
          materialName: mat.children[0].innerHTML,
          uom: mat.children[1].innerHTML,
          qty: mat.children[2].value,
        });
      }
    }

    try {
      axios
        .post(ipL + "/bill_receive/updateBill", {
          billArr: detailsPr,
          billDtlArr: detailsSe,
          multStore: false,
        })
        .then((response) => {
          alert(response.data.message);
          console.log(response);
          if (response.data.message === "Records Updated") {
            console.log(detailsPr.bill_num + "_" + detailsPr.sup_name);

            const data = new FormData();
            data.append("bill_image", upImage);
            data.append(
              "file_name",
              detailsPr[0].bill_num + "_" + detailsPr[0].sup_name
            );
            try {
              axios.post("/bill_receive/uploadImage", data).then((response) => {
                console.log(response.message);
                try {
                  if (response.status === 200) {
                    //clearPage();
                  } else {
                    alert(
                      "Critical Error!! Image could not be uploaded. Please Contact administrator!!"
                    );
                  }
                } catch (error) {
                  console.log(error);
                }
              });
            } catch (error) {
              alert(error);
            }
          } else if (response.data.message != null) {
            console.log(response.data.message);
            console.log(response.message);
          }
        });
    } catch (error) {
      alert(error);
    }

    function removeDuplicates(arr) {
      return [...new Set(arr)];
    }
  };
  /**
 *   function clearPage() {
    setPoStore("");
    setMaterialList([]);
    setImage("");
    setUpImage("");
    setFileUploadClass("class-hidden");
    document.getElementById("billNum").value = "";
    document.getElementById("supName").value = "";
    document.getElementById("billDate").value = "";
    document.getElementById("bill_amt").value = "";
  }

 */
  return (
    <div className="billScreen">
      <form>
        <div>
          <div className="initEntry">
            <div className="screen-header">Bill Receive Form</div>
            <div>
              <div className="form-group-1" onChange={fileUploadBtnStatus}>
                <Input
                  name="Date"
                  for="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  id="billDate"
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
                <SelectInput
                  id="storeName"
                  list={storeList}
                  name="Store Name"
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
            <div className="material-rows">
              {
                materialList.map((mat, idx) => (
                  //console.log(idx);
                  <TableRow
                    matName={mat.NOMEN1}
                    uom={mat.UNIT_NM}
                    qty={mat.BAL_QTY}
                    key={idx}
                    id={"r-" + idx}
                  />
                ))
                //<TableRowStatic matName={m.mat} uom={m.uom} qty={m.qty} />
              }
            </div>
            <div className="billAmountInput">
              <span>Enter Bill Amount</span>
              <InputBoxValue id={"bill_amt"} />
            </div>
          </div>
          <Button
            class={fileUploadClass}
            type="file"
            id="uploadImage"
            onChangeFunc={onImageChange}
            onClickFunc={onImgBtnClick}
          />
        </div>
      </form>

      <div className="billImage">
        <img className="billImageSRC" alt="attached bill" src={image}></img>
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
