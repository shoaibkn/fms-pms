//import { useState } from "react";

//import(useState);
export default function Button(props) {
  return (
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onClick={props.onClickFunc}
    ></input>
  );
}
