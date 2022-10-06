export default function Input(props) {
  return (
    <div>
      <label htmlFor={props.for}>{props.name}</label>
      <br></br>
      <input
        className="input-form"
        htmlFor={props.for}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
}
