const oracledb = require("oracledb");
const { format } = require("path");
const db = require("../models");
//const models = require("../models");
const BillRecv = db.bill_recv_model;
const BillRecvDtl = db.bill_receive_dtl_model;

let sql, binds, options;

async function supplierListfunc() {
  try {
    let connection;
    let supList = [];
    try {
      connection = await oracledb.getConnection({
        user: "shoetech",
        password: "temppass",
        connectString: "103.207.64.233/ORCL", //change IP to global in production
      });
    } catch (error) {
      console.log("Cannot create Connection with Database");
      console.log(error);
    }

    sql =
      "SELECT DISTINCT (SM_SUPPLIERS.SUPPLIER) FROM SMI_PO_DTL INNER JOIN SMI_PO ON SMI_PO.PO_NO = SMI_PO_DTL.PO_NO AND SMI_PO.FIN_YEAR = SMI_PO_DTL.FIN_YEAR AND SMI_PO.STORE_CD = SMI_PO_DTL.STORE_CD AND SMI_PO.FIN_YEAR = '22-23' JOIN SM_SUPPLIERS ON SMI_PO.PARTY_CD = SM_SUPPLIERS.SUPP_ID ORDER BY SM_SUPPLIERS.SUPPLIER";
    binds = {};
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };
    //console.log(sql);
    result = await connection.execute(sql, binds, options);
    //console.log(result);
    //console.log()
    //return result.rows;
    for (let i = 0; i < result.rows.length; i++) {
      supList.push(result.rows[i].SUPPLIER);
    }
    return supList;
  } catch (error) {
    console.log(error);
  }
}

const fetchMaterialsfunc = async (supplierName, store_po) => {
  //console.log(store_po);
  let mArr = [];
  let finalArr = [];
  let stateData;
  //let { supplierName, store_po } = req.body;
  let poList = store_po.split(";");
  const storeList = ["GS", "GES", "CS", "LS", "LAS", "SS", "PAS"];
  let gsPO = [];
  let gePO = [];
  let csPO = [];
  let lsPO = [];
  let laPO = [];
  let psPO = [];
  let ssPO = [];
  //console.log(poList.length);
  let st = [];
  let po = [];

  for (let st_po of poList) {
    st = st_po.split("_")[0].trim();
    console.log(st);
    po = st_po.split("_")[1].trim();
    //console.log(po);

    switch (st) {
      case "GS":
        gsPO.push(po);
        break;
      case "GES":
        gePO.push(po);
        break;
      case "CS":
        csPO.push(po);
        break;
      case "LS":
        lsPO.push(po);
        break;
      case "LAS":
        laPO.push(po);
        break;
      case "PAS":
        psPO.push(po);
        break;
      case "SS":
        ssPO.push(po);
        break;
      default:
        "";
    }
    st = [];
    po = [];
    console.log(gsPO);
  }

  if (gsPO != "") {
    mArr.push({ store: "GS", po: "(" + gsPO.join(",") + ")" });
  }
  if (gePO != "") {
    mArr.push({ store: "GES", po: "(" + gePO.join(",") + ")" });
  }
  if (csPO != "") {
    mArr.push({ store: "CS", po: "(" + csPO.join(",") + ")" });
  }
  if (lsPO != "") {
    mArr.push({ store: "LS", po: "(" + lsPO.join(",") + ")" });
  }
  if (laPO != "") {
    mArr.push({ store: "LAS", po: "(" + laPO.join(",") + ")" });
  }
  if (psPO != "") {
    mArr.push({ store: "PAS", po: "(" + psPO.join(",") + ")" });
  }
  if (ssPO != "") {
    mArr.push({ store: "SS", po: "(" + ssPO.join(",") + ")" });
  }

  //console.log(mArr);
  let connection;
  try {
    let sql, binds, options, result;
    try {
      connection = await oracledb.getConnection({
        user: "shoetech",
        password: "temppass",
        connectString: "103.207.64.233/ORCL",
      });
    } catch (error) {
      console.log("Cannot create Connection with Database");
      console.log(error);
    }

    console.log(mArr);
    for (let poD of mArr) {
      sql =
        "SELECT DISTINCT SMI_PO_DTL.NOMEN1, SM_UNIT.UNIT_NM, SUM(SMI_PO_DTL.QTY - SMI_PO_DTL.QTY_RECV) AS BAL_QTY FROM SMI_PO_DTL INNER JOIN SMI_PO ON SMI_PO.PO_NO = SMI_PO_DTL.PO_NO AND SMI_PO.FIN_YEAR = SMI_PO_DTL.FIN_YEAR AND SMI_PO.STORE_CD = SMI_PO_DTL.STORE_CD JOIN SM_SUPPLIERS ON SMI_PO.PARTY_CD = SM_SUPPLIERS.SUPP_ID JOIN SM_UNIT ON SMI_PO_DTL.UNIT_ID = SM_UNIT.UNIT_ID LEFT JOIN SMI_PO_SUBDTL ON SMI_PO_DTL.PO_NO = SMI_PO_SUBDTL.PO_NO AND SMI_PO_DTL.FIN_YEAR = SMI_PO_SUBDTL.YCODE AND SMI_PO_DTL.MAT_ID = SMI_PO_SUBDTL.MAT_ID LEFT JOIN SMS_ORDER_DTL ON SMS_ORDER_DTL.PROD_ORDER_NO = SMI_PO_SUBDTL.OS_NO WHERE SMI_PO.FIN_YEAR = '22-23' AND SMI_PO_DTL.STORE_CD = " +
        "'" +
        poD.store +
        "'" +
        " AND SMI_PO_DTL.PO_NO IN " +
        poD.po +
        " AND SM_SUPPLIERS.SUPPLIER = " +
        "'" +
        supplierName +
        "'" +
        " GROUP BY SMI_PO_DTL.NOMEN1,SM_UNIT.UNIT_NM";
      binds = {};
      options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      };
      //console.log(sql);
      result = await connection.execute(sql, binds, options);

      //console.log("Metadata : ");
      //console.dir(result.metaData, { depth: null });
      //console.log("Result : ");
      //console.dir(result.rows, { depth: null });
      finalArr.push(result.rows);
    }
  } catch (error) {
    console.log("Cannot create Connection with Database");
    console.log(error);
  }
  if (finalArr[0].length === 0) {
    console.log({ message: "Materials not Found" });
    return { message: "Materials not Found" };
  }
  let matList = [];
  //for(let i = 0; i <finalArr.length(); i++)
  //console.log(finalArr);
  console.log(finalArr[0].length);
  return finalArr;
  //console.log(finalArr);
};

const fetchMaterialsWOfunc = async (supplierName, store_po) => {
  let mArr = [];
  let finalArr = [];
  let stateData;
  //let { supplierName, store_po } = req.body;
  console.log(store_po);
  console.log(supplierName);
  let poList = store_po.replace(";", "','");
  console.log(poList);
  const storeList = ["GS", "GES", "CS", "LS", "LAS", "SS", "PAS"];

  let connection;
  let sql, binds, options, result;
  try {
    try {
      connection = await oracledb.getConnection({
        user: "shoetech",
        password: "temppass",
        connectString: "103.207.64.233/ORCL",
      });
    } catch (error) {
      console.log("Cannot create Connection with Database");
      console.log(error);
    }

    sql =
      "SELECT DISTINCT SMI_PO_DTL.NOMEN1, SM_UNIT.UNIT_NM, SUM(SMI_PO_DTL.QTY - SMI_PO_DTL.QTY_RECV) AS BAL_QTY FROM SMI_PO_DTL INNER JOIN SMI_PO ON SMI_PO.PO_NO = SMI_PO_DTL.PO_NO AND SMI_PO.FIN_YEAR = SMI_PO_DTL.FIN_YEAR AND SMI_PO.STORE_CD = SMI_PO_DTL.STORE_CD JOIN SM_SUPPLIERS ON SMI_PO.PARTY_CD = SM_SUPPLIERS.SUPP_ID JOIN SM_UNIT ON SMI_PO_DTL.UNIT_ID = SM_UNIT.UNIT_ID LEFT JOIN SMI_PO_SUBDTL ON SMI_PO_DTL.PO_NO = SMI_PO_SUBDTL.PO_NO AND SMI_PO_DTL.FIN_YEAR = SMI_PO_SUBDTL.YCODE AND SMI_PO_DTL.MAT_ID = SMI_PO_SUBDTL.MAT_ID LEFT JOIN SMS_ORDER_DTL ON SMS_ORDER_DTL.PROD_ORDER_NO = SMI_PO_SUBDTL.OS_NO WHERE SMI_PO.FIN_YEAR = '22-23' AND SMI_PO_DTL.STORE_CD in " +
      "('" +
      poList +
      "')" +
      " AND SM_SUPPLIERS.SUPPLIER = " +
      "'" +
      supplierName +
      "'" +
      " GROUP BY SMI_PO_DTL.NOMEN1,SM_UNIT.UNIT_NM";
    binds = {};
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };
    console.log(sql);
    result = await connection.execute(sql, binds, options);
  } catch (error) {
    return { message: "Materials not Found" };
  }
  if (result === [[]]) {
    //console.log({ message: "Materials not Found" });
    return { message: "Materials not Found" };
  }

  let matList = [];
  console.log(result);
  return result;
};

const BillUpdate = async (req, res, next) => {
  const { billArr, billDtlArr, multStore } = req.body;
  let data = { sup_name: billArr[0].sup_name, bill_num: billArr[0].bill_num };
  let billStatus = checkRepeat(data);
  console.log(billStatus);
  if (billStatus.message != null) {
    console.log(billStatus.message);
    return billStatus;
  }

  try {
    let billrecvUpdate = await BillRecv.create({
      timestamp: Date.now(),
      bill_num: billArr[0].bill_num,
      bill_date: billArr[0].bill_date,
      supplier_nm: billArr[0].sup_name,
      bill_amt: billArr[0].bill_amt,
      bill_img_link: `192.168.1.105:3500/BillImages/${
        billArr[0].bill_num + "_" + billArr[0].sup_name + ".jpeg"
      }`,
    });

    console.log(billrecvUpdate.bill_id);

    try {
      if (multStore == false) {
        for (let mat of billDtlArr) {
          await BillRecvDtl.create({
            bill_id: billrecvUpdate.bill_id,
            store_id: mat.store_id,
            po_num: mat.po_num,
            material_nm: mat.materialName,
            uom: mat.uom,
            qty: mat.qty,
          });
        }
      }
    } catch (error) {
      await BillRecv.destroy({ where: { bill_id: billrecvUpdate.bill_id } });
      return {
        message: "Something went wrong the changes have been rolled back...",
      };
    }
  } catch (error) {
    return { message: error };
  }
  return { message: "success" };
};

const checkRepeat = async (data) => {
  const { sup_name, bill_num } = data;
  let r = await BillRecv.findOne({
    where: { bill_num: bill_num, supplier_nm: sup_name },
  });
  console.log(r);
  if (r != null) {
    console.log("Value not null");

    return { message: "Bill Details already present!" };
  }
};

module.exports = {
  supplierListfunc,
  fetchMaterialsfunc,
  fetchMaterialsWOfunc,
  BillUpdate,
};
