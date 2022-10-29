import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import LoginBox from "./pages/login-box";
import AccountsTasks from "./pages/accounts_task";
import BillIssueNote from "./pages/bill_issue_note";
import BillReceive from "./pages/bill_receive";
import BillRecvNote from "./pages/bill_recv_note";
import CourierIn from "./pages/courier_in";
import CourierOut from "./pages/courier_out";
import GRNTasks from "./pages/grn_tasks";
import StoreTasks from "./pages/store_tasks";
import WOBillReceive from "./pages/wo_bill_receive";
import NotFound from "./pages/404";
import HeaderNav from "./components/desk-nav";
import ComponentTest from "./pages/componentTest";

function App() {
  const uname = "Shoaib";

  return (
    <BrowserRouter>
      <HeaderNav uname={uname} />
      <Routes>
        <Route path="/" element={<LoginBox />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="dashboard/accounts_task" element={<AccountsTasks />} />
        <Route path="dashboard/bill_issue_note" element={<BillIssueNote />} />
        <Route path="dashboard/bill_receive" element={<BillReceive />} />
        <Route path="dashboard/bill_recv_note" element={<BillRecvNote />} />
        <Route path="dashboard/courier_in" element={<CourierIn />} />
        <Route path="dashboard/courier_out" element={<CourierOut />} />
        <Route path="dashboard/grn_tasks" element={<GRNTasks />} />
        <Route path="dashboard/store_tasks" element={<StoreTasks />} />
        <Route path="dashboard/wo_bill_receive" element={<WOBillReceive />} />
        <Route path="componentTest" element={<ComponentTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//("<Dashboard mod_list={mod_names} />;");
//function to fetch all module_names using module_ids from auth_db and modules
//using predfined list for now
/*
      <div className="App">
        <LoginBox />
      </div>*/
const mod_names = [
  "Bill Receive Form",
  "W/O Bill Receive Form",
  "Courier In",
  "Courier Out",
  "Bill Transfer Note",
  "Projection Email",
];

function submitBill() {
  alert("Button CLicked");
  console.log("Button CLicked");
}
