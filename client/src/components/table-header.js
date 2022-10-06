export default function TableHeader(props) {
  let tHead = props.heads;
  let header = [];
  //let style = { flexGrow: 0.2 };
  let styleFG = props.flexG;

  for (var i = 0; i < tHead.length; i++) {
    header.push(<span style={styleFG[i]}>{tHead[i]}</span>);
  }

  return <div className="table-header">{header}</div>;
}
