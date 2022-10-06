import { Link } from "react-router-dom";
import { useState } from "react";
export default function HeaderNav(props) {
  const { name, setName } = useState();

  return (
    <div className="header-navbar">
      <div id="hamburger-menu" onClick={showNav()}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12H40V16H8V12ZM8 22H40V26H8V22ZM8 32H40V36H8V32Z"
            fill="black"
          />
        </svg>
      </div>

      <div className="nav-data">
        <h3>Welcome Admin</h3>
        <Link to="dashboard">
          <span>Dashboard</span>
        </Link>
        <span>{" > "}</span>

        <span>{getName()}</span>
      </div>

      <div id="account-avt">
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 25C16.7421 25 19.6709 23.6584 21.7614 21.5C20.79 20.497 19.6423 19.6773 18.3731 19.0835C16.8302 18.3617 15.1462 17.9917 13.4428 18.0001C11.7395 18.0086 10.0593 18.3954 8.52365 19.1325C7.29482 19.7223 6.18312 20.5247 5.23864 21.5C7.32914 23.6584 10.2579 25 13.5 25ZM19.2205 17.2719C20.638 17.9351 21.9264 18.8382 23.0302 19.9383C24.2737 18.1012 25 15.8854 25 13.5C25 7.14873 19.8513 2 13.5 2C7.14873 2 2 7.14873 2 13.5C2 15.8854 2.7263 18.1012 3.96981 19.9383C5.04159 18.8701 6.28785 17.9872 7.6582 17.3294C9.4609 16.4641 11.4333 16.0101 13.4329 16.0002C15.4325 15.9902 17.4093 16.4246 19.2205 17.2719ZM13.5 27C20.9558 27 27 20.9558 27 13.5C27 6.04416 20.9558 0 13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27ZM16.5 10C16.5 11.6569 15.1569 13 13.5 13C11.8431 13 10.5 11.6569 10.5 10C10.5 8.34315 11.8431 7 13.5 7C15.1569 7 16.5 8.34315 16.5 10ZM18.5 10C18.5 12.7614 16.2614 15 13.5 15C10.7386 15 8.5 12.7614 8.5 10C8.5 7.23858 10.7386 5 13.5 5C16.2614 5 18.5 7.23858 18.5 10Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}

function showNav() {}
function getName() {
  let url = window.location.href.split("/");
  return linkName(url);
}

function linkName(name) {
  switch (name) {
    case "bill_receive":
      return "Bill Receive Form";
    case "wo_bill_receive":
      return "W/O Bill Receive Form";
    case "courier_in":
      return "Courier In";
    case "courier_out":
      return "Courier Out";
    case "bill_issue_note":
      return "Bill Transfer Note";
    case "bill_recv_note":
      return "Bill Receive Note";
    case "grn_tasks":
      return "GRN Tasks";
    case "store_tasks":
      return "Store Tasks";
    case "accounts_task":
      return "Accounts Tasks";
    case "pending_bills_report":
      return "Pending Bills Report";
    case "material_quality":
      return "Material Quality Feedback";
    case "passing_rejection":
      return "Quality Passing/Rejection";
    case "quality_feedback_report":
      return "Quality Feedback Report";
    case "po_to_delivery":
      return "PO To Delivery FMS";
    case "order_to_po":
      return "Order To PO FMS";
    case "projection_email":
      return "Projection Email";
    case "pending_material_for_po":
      return "Pending Material For PO Report";
    case "pending_material_for_pro":
      return "Pending Material For Projection";
    case "order_to_collection":
      return "Order To Collection FMS";
    case "tasks":
      return "Tasks";
    case "pending_tasks_report":
      return "Pending Tasks Report";
    default:
      return "";
  }
}
