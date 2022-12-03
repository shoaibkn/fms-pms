import "../components/grn_tasks.css";
import Button from "../components/button";
import Input from "../components/input";
import TableHeader from "../components/table-header";
import TableRowsIMCDBill from "../components/table_row_tasks_imcd";
export default function IMCDTasks() {
  let rowData = [
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
    [
      "1041",
      "10/12/2021",
      "Versatile Operations",
      "1024;1033",
      "GENERAL CEMENT ROLL WHITE",
      "24500.00",
    ],
  ];

  let fetchByDate = () => {};
  let fetchAll = () => {};
  let updateIMCD = () => {};
  let printReport = () => {};

  let td = [];
  rowData.forEach((m, i) =>
    td.push(
      <TableRowsIMCDBill
        idx={i}
        billNum={rowData[i][0]}
        billDate={rowData[i][1]}
        supName={rowData[i][2]}
        poNum={rowData[i][3]}
        matName={rowData[i][4]}
        amount={rowData[i][5]}
      />
    )
  );
  return (
    <div className="billScreen_2">
      <div className="initEntry">
        <div className="screen-header">IMCD Tasks</div>
        <div>
          <div className="form-group-1">
            <Input
              name="From Date"
              for="date"
              type="date"
              placeholder="dd/mm/yyyy"
            />
            <Input
              name="To Date"
              for="date"
              type="date"
              placeholder="dd/mm/yyyy"
            />
            <Button
              type="button"
              id="fetchBillsByDate"
              value="Fetch Bills By Date"
              onClickFunc={fetchByDate}
            />
          </div>
          <div className="form-group-2">
            <Button
              type="button"
              id="fetchPendingBtn"
              value="Fetch All Pending Bills"
              onClickFunc={fetchAll}
            />
          </div>
        </div>
      </div>
      <div className="typematerialList_2">
        <TableHeader
          heads={[
            "Gate",
            "All OK",
            "Bill Number",
            "Bill Date",
            "Supplier Name",
            "PO Number(s)",
            "Material Detail(s)",
            "Mat Qty",
            "Qty Recv",
          ]}
          flexG={[
            { flexGrow: 0.0 },
            { flexGrow: 0.025 },
            { flexGrow: 0.05 },
            { flexGrow: 0.08 },
            { flexGrow: 0.1 },
            { flexGrow: 0.08 },
            { flexGrow: 0.2 },
            { flexGrow: 0.1 },
          ]}
        />
        <div className="material-rows">{td}</div>
      </div>
      <div className="button-flex">
        <Button
          type="button"
          id="recvTransferBtn"
          value="Update"
          onClickFunc={updateIMCD}
        />
        <Button
          type="button"
          id="printReportBtn"
          value="Print Report"
          onClickFunc={printReport}
        />
      </div>
    </div>
  );
}
