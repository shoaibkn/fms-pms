const oracledb = require("oracledb");
const { format } = require("path");
let sql, binds, options;

async function supplierListfunc() {
  try {
    let connection;
    let supList = [];
    try {
      connection = await oracledb.getConnection({
        user: "shoetech",
        password: "temppass",
        connectString: "192.168.1.43/ORCL",
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

  for (let st_po of poList) {
    let st = st_po.split("_")[0];
    //console.log(st);
    let po = st_po.split("_")[1];
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
        connectString: "192.168.1.43/ORCL",
      });
    } catch (error) {
      console.log("Cannot create Connection with Database");
      console.log(error);
    }
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
    //console.log(error);
  }
  let matList = [];
  //for(let i = 0; i <finalArr.length(); i++)

  return finalArr;
  //console.log(finalArr);
};

const fetchMaterialsWOfunc = async (supplierName, store_po) => {
  let mArr = [];
  let finalArr = [];
  let stateData;
  //let { supplierName, store_po } = req.body;
  console.log(store_po);
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
        connectString: "192.168.1.43/ORCL",
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

    //console.log("Metadata : ");
    //console.dir(result.metaData, { depth: null });
    //console.log("Result : ");
    //console.dir(result.rows, { depth: null });
  } catch (error) {
    //console.log(error);
  }
  let matList = [];
  //for(let i = 0; i <finalArr.length(); i++)

  return result;
};

module.exports = { supplierListfunc, fetchMaterialsfunc, fetchMaterialsWOfunc };
