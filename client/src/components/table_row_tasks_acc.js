export default function TableRowsAccBill(props) {
  return (
    <div className="table-row-multi-grn">
      <input class="float-checkbox" type="checkbox" />
      <input
        style={{ flexGrow: 0.05 }}
        class="float-checkbox"
        type="checkbox"
      />
      <span style={{ flexGrow: 0.2 }} className="row-billNum-mul">
        {props.billNum}
      </span>
      <span style={{ flexGrow: 0.13 }} className="row-billDate-mul">
        {props.billDate}
      </span>
      <p style={{ flexGrow: 0.1 }} className="row-supName-mul">
        {props.supName}
      </p>
      <span style={{ flexGrow: 0.21 }} className="row-poNum-mul">
        {props.poNum}
      </span>
      <p style={{ flexGrow: 0.15 }} className="row-mat-mul">
        {props.matName}
      </p>
      <span style={{ flexGrow: 0.15 }} className="row-amount-mul">
        {props.amount}
      </span>
      <input class="float-checkbox" type="checkbox" />
    </div>
  );
}

/**{ flexGrow: 0.05 },
            { flexGrow: 0.04 },
            { flexGrow: 0.08 },
            { flexGrow: 0.08 },
            { flexGrow: 0.1 },
            { flexGrow: 0.08 },
            { flexGrow: 0.2 },
            { flexGrow: 0.1 },
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
