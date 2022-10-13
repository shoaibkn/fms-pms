export default function SelectInput(props) {
  let supList = props.list;
  let list = [];
  supList.map((sup, idx) => {
    list.push(
      <option key={idx} value={sup}>
        {sup}
      </option>
    );
  });
  return (
    <div>
      <label htmlFor="props.for">{props.name}</label>
      <br></br>
      <select className="select-input" id={props.id} name="props.for">
        <option value="default-val">-</option>
        {list}
      </select>
    </div>
  );
}
