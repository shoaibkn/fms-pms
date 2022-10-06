import "../components/bill_issue_note.css";
import Button from "../components/button";
import Input from "../components/input";
import TableHeader from "../components/table-header";
import TableRowsNote from "../components/table_row_note";
export default function BillIssueNote() {
  let rowData = [
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : 120 ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : 120 ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : 120 ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : 120 ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : 120 ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : ROLL",
      "12000.00",
    ],
    [
      "1992",
      "12/9/2022",
      "K.Ramesh Chand",
      "124; 128",
      "GENERAL CEMENT ROLL WHITE : ROLL",
      "12000.00",
    ],
  ];
  let td = [];
  rowData.forEach((m, i) =>
    td.push(
      <TableRowsNote
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
        <div className="screen-header">Bill Issue Note</div>
        <div>
          <div className="form-group-1">
            <Input
              name="Date"
              for="date"
              type="date"
              placeholder="dd/mm/yyyy"
            />
            <Input
              name="Issue To"
              for="text"
              type="text"
              placeholder="Name"
              id="issueTo"
            />
          </div>
          <div className="form-group-2">
            <Input
              id="billTransfer"
              for="text"
              type="text"
              placeholder="Enter ID"
              name="Bill Transfer ID"
            />
            <Button
              type="button"
              id="fetchPendingBtn"
              value="Fetch Pending Bills"
              onClickFunc={""}
            />
          </div>
        </div>
      </div>
      <div className="typematerialList_2">
        <TableHeader
          heads={[
            "Check",
            "Bill Number",
            "Bill Date",
            "Supplier Name",
            "PO Number(s)",
            "Material Detail(s)",
            "Amount",
          ]}
          flexG={[
            { flexGrow: 0.01 },
            { flexGrow: 0.0 },
            { flexGrow: 0.0 },
            { flexGrow: 0.0 },
            { flexGrow: 0.06 },
            { flexGrow: 0.27 },
            { flexGrow: 0.0 },
          ]}
        />
        <div className="material-rows">{td}</div>
      </div>
      <Button
        type="button"
        id="issueTransferBtn"
        value="Issue Transfer"
        onClickFunc={""}
      />
    </div>
  );
}
