import React from "react";
import AccountDetails from "../components/common/AccountDetails";
import AdminDash from "../components/common/AdminDash";
import Transactions from "../components/common/Transactions";

const Admin = ({ userInfo }) => {
  console.log("Admin: ", userInfo);
  console.log("Admin Name: ", userInfo.name);
  console.log("Admin Name: ", userInfo.name);
  return (
    <div className="admin-page">
      <h2>Admin</h2>
      <AdminDash />
      <AccountDetails userInfo={userInfo} />
      <Transactions userInfo={userInfo} />
    </div>
  );
};

export default Admin;
