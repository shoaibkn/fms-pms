import { Link } from "react-router-dom";
import Window from "./window";

export default function Frame({ name, values }) {
  return (
    <div className="frame">
      <h2 className="section-heading">{name}</h2>

      <Window values={values} />
    </div>
  );
}
