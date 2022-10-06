export default function InputBoxValue(props) {
  return (
    <input
      className="input-form-value"
      htmlFor={props.for}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
}
