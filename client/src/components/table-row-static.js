export default function TableRowStatic(props) {
  return (
    <div className="table-row" key={props.id}>
      <p className="row-material" key={`${props.id}-mat`}>
        {props.matName}
      </p>
      <p className="row-uom" key={`${props.id}-uom`}>
        {props.uom}
      </p>
      <span className="row-qty" key={`${props.id}-qty`}>
        {props.qty}
      </span>
    </div>
  );
}
