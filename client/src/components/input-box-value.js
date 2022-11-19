export default function InputBoxValue(props) {
  let classA = `${props.classA} input-form-value`;
  return (
    <input
      className={classA}
      htmlFor={props.for}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
}
