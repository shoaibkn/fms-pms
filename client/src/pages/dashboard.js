import StatsWindow from "../components/stats-window";
import Frame from "../components/frame";

export default function Dashboard(props) {
  let mod = restruct(1);
  let final = [];

  mod.forEach((m, i) => final.push(<Frame values={m} name={gName(i)} />));
  return (
    <div>
      <StatsWindow />
      {final}
    </div>
  );
}

//use module names passed as a prop to structure and create dashboard frames
//function to break the mod_list array and restructure in different module types

function restruct(c) {
  //populate this array using sql
  let mod_list = [
    "Bill Receive Form",
    "W/O Bill Receive Form",
    "Courier In",
    "Courier Out",
    "IMCD Tasks",
    "GRN Tasks",
    "Store Tasks",
    "Accounts Tasks",
    "Pending Bills Report",
    "Material Quality Feedback",
    "Quality Passing/Rejection",
    "Quality Feedback Report",
    "PO To Delivery FMS",
    "Order To PO FMS",
    "Projection Email",
    "Pending Material For PO Report",
    "Pending Material For Projection",
    "Order To Collection FMS",
    "Tasks",
    "Pending Tasks Report",
  ];

  let g1 = [];
  let g2 = [];
  let g3 = [];
  let g4 = [];
  let g5 = [];
  let m1 = [
    "Bill Receive Form",
    "W/O Bill Receive Form",
    "Courier In",
    "Courier Out",
    "Bill Transfer Note",
    "Bill Receive Note",
    "IMCD Tasks",
    "GRN Tasks",
    "Store Tasks",
    "Accounts Tasks",
    "Pending Bills Report",
  ];
  let m2 = [
    "Material Quality Feedback",
    "Quality Passing/Rejection",
    "Quality Feedback Report",
  ];
  let m3 = [
    "PO To Delivery FMS",
    "Order To PO FMS",
    "Projection Email",
    "Pending Material For PO Report",
    "Pending Material For Projection",
  ];
  let m4 = ["Order To Collection FMS", "Tasks", "Pending Tasks Report"];
  let m5 = [];
  let m6 = [];
  let m7 = [];
  let m8 = [];

  mod_list.forEach((mod) => {
    if (m1.indexOf(mod) >= 0) {
      g1.push(mod);
    } else if (m2.indexOf(mod) >= 0) {
      g2.push(mod);
    } else if (m3.indexOf(mod) >= 0) {
      g3.push(mod);
    } else if (m4.indexOf(mod) >= 0) {
      g4.push(mod);
    } else if (m5.indexOf(mod) >= 0) {
      g5.push(mod);
    }
  });
  let mArr = [g1, g2, g3, g4];
  switch (c) {
    case 1:
      return mArr;
    case 2:
      return mArr[1];
    default:
      return "Invalid";
  }
}

function gName(i) {
  {
    switch (i) {
      case 0:
        return "Bill Receive";
      case 1:
        return "Quality";
      case 2:
        return "Purchase";
      case 3:
        return "Order To Collection";
      default:
        return "Undefined";
    }
  }
}
