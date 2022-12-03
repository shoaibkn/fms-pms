import { Link } from "react-router-dom";

export default function Block(props) {
  let final = [];
  let vArr = props.values;
  for (let v of vArr) {
    final.push(
      <Link to={linkName(v)} className="blockLink">
        <div className="block">
          <div className="block-name">{v}</div>
        </div>
      </Link>
    );
  }
  return final;
}

/**
 * <div className="block" href={props.link}>
      {props.values}
    </div>
 */

function linkName(name) {
  switch (name) {
    case "Bill Receive Form":
      return "bill_receive";
    case "W/O Bill Receive Form":
      return "wo_bill_receive";
    case "Courier In":
      return "courier_in";
    case "Courier Out":
      return "courier_out";
    case "IMCD Tasks":
      return "imcd_tasks";
    case "Bill Transfer Note":
      return "bill_issue_note";
    case "Bill Receive Note":
      return "bill_recv_note";
    case "GRN Tasks":
      return "grn_tasks";
    case "Store Tasks":
      return "store_tasks";
    case "Accounts Tasks":
      return "accounts_task";
    case "Pending Bills Report":
      return "pending_bills_report";
    case "Material Quality Feedback":
      return "material_quality";
    case "Quality Passing/Rejection":
      return "passing_rejection";
    case "Quality Feedback Report":
      return "quality_feedback_report";
    case "PO To Delivery FMS":
      return "po_to_delivery";
    case "Order To PO FMS":
      return "order_to_po";
    case "Projection Email":
      return "projection_email";
    case "Pending Material For PO Report":
      return "pending_material_for_po";
    case "Pending Material For Projection":
      return "pending_material_for_pro";
    case "Order To Collection FMS":
      return "order_to_collection";
    case "Tasks":
      return "tasks";
    case "Pending Tasks Report":
      return "pending_tasks_report";
    default:
      return "*";
  }
}
