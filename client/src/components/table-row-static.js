export default function TableRowStatic(props) {
  return (
    <div className="table-row" key={props.id}>
      <p className="row-material">{props.matName}</p>
      <span className="row-uom">{props.uom}</span>
      <p className="row-qty">{props.qty}</p>
    </div>
  );
}
