//import { useState } from "react";

//import(useState);
export default function Button(props) {
  return (
    <input
      className={props.class}
      type={props.type}
      id={props.id}
      value={props.value}
      onClick={props.onClickFunc}
      onChange={props.onChangeFunc}
    ></input>
  );
}
