import { useState, useEffect } from "react";
import InputBoxValue from "./input-box-value";

export default function TableRow(props) {
  const [rowClass, setRowClass] = useState("table-row");

  let inuputType = props.type;

  let onChangeSelect = () => {
    if (document.getElementById(props.id).value > 0) {
      setRowClass("table-row row-selected");
    } else if (document.getElementById(props.id).value === "") {
      setRowClass("table-row");
    }
  };
  return (
    <div className={rowClass} key={props.i} id={"table-row-" + props.id}>
      <p className="row-material">{props.matName}</p>
      <span className="row-uom">{props.uom}</span>
      <input
        className={"input-form-value"}
        htmlFor={props.for}
        id={props.id}
        type="number"
        placeholder={props.placeholder}
        onChange={onChangeSelect}
      ></input>
    </div>
  );
}
