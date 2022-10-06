export default function TableRowsNote(props) {
  return (
    <div className="table-row-note">
      <input type="checkbox" className="float-checkbox" />
      <span className="row-billNum-note">{props.billNum}</span>
      <span className="row-billDate-note">{props.billDate}</span>
      <p className="row-supName-note">{props.supName}</p>
      <span className="row-poNum-note">{props.poNum}</span>
      <p className="row-mat-note">{props.matName}</p>
      <span className="row-amount-note">{props.amount}</span>
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
