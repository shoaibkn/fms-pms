export default function TableRowsMulti(props) {
  return (
    <div className="table-row-multi">
      <input
        style={{ flexGrow: 0.05 }}
        type="checkbox"
        className="float-checkbox"
      />
      <span style={{ flexGrow: 0.05 }} className="row-billNum-mul">
        {props.billNum}
      </span>
      <span style={{ flexGrow: 0.05 }} className="row-billDate-mul">
        {props.billDate}
      </span>
      <p style={{ flexGrow: 0.15 }} className="row-supName-mul">
        {props.supName}
      </p>
      <span style={{ flexGrow: 0.05 }} className="row-poNum-mul">
        {props.poNum}
      </span>
      <p style={{ flexGrow: 0.03 }} className="row-mat-mul">
        {props.matName}
      </p>
      <span style={{ flexGrow: 0 }} className="row-amount-mul">
        {props.amount}
      </span>
    </div>
  );
}

/**
 * billNum={rowData[i][0]}
        billDate={rowData[i][1]}
        supName={rowData[i][2]}
        poNum={rowData[i][3]}
        matName={rowData[i][4]}
        amount={rowData[i][5]}
  { flexGrow: 0.1 },
            { flexGrow: 0.1 },
            { flexGrow: 0.2 },
            { flexGrow: 0.1 },
            { flexGrow: 0.5 },
            { flexGrow: 0 },


        */
