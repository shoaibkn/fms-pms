import "../components/grn_tasks.css";
import Button from "../components/button";
import Input from "../components/input";
import TableHeader from "../components/table-header";
import TableRowsAccBill from "../components/table_row_tasks_acc";
export default function AccountsTasks() {
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
  let td = [];
  rowData.forEach((m, i) =>
    td.push(
      <TableRowsAccBill
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
        <div className="screen-header">Accounts Tasks</div>
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
              onClickFunc={""}
            />
          </div>
          <div className="form-group-2">
            <Input
              name="Bill Transfer ID"
              for="text"
              type="text"
              placeholder="Transfer ID"
            />
            <Button
              type="button"
              id="fetchPendingBtn"
              value="Fetch All Pending Bills"
              onClickFunc={""}
            />
          </div>
        </div>
      </div>
      <div className="typematerialList_2">
        <TableHeader
          heads={[
            "Gate",
            "IMCD",
            "Bill Number",
            "Bill Date",
            "Supplier Name",
            "PO Number(s)",
            "Material Detail(s)",
            "Amount",
            "Bills Approved",
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
          value="Mark Received"
          onClickFunc={""}
        />
        <Button
          type="button"
          id="printReportBtn"
          value="Print Report"
          onClickFunc={""}
        />
      </div>
    </div>
  );
}
