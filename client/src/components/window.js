import { Link } from "react-router-dom";
import Block from "./block";

export default function Window(props) {
  //pass moduleNames from a seperate function
  return (
    <div className="window">
      <Block values={props.values} />
    </div>
  );
}

//function to fetch all Module Names for user
