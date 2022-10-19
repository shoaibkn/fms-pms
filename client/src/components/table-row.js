import InputBoxValue from "./input-box-value";

export default function TableRow(props) {
  let inuputType = props.type;
  return (
    <div className="table-row">
      <p className="row-material">{props.matName}</p>
      <span className="row-uom">{props.uom}</span>
      <InputBoxValue type={inuputType} placeholder={props.placeholder} />
    </div>
  );
}
