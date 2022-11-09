import React from "react";
import AccountDetails from "../components/common/AccountDetails";
import RecentTransactions from "../components/common/RecentTransactions";

const Admin = ({ user }) => {
  console.log("Admin: ", user);
  console.log("Admin Name: ", user.name);
  console.log("Admin Name: ", user.name);
  return (
    <div className="admin-page">
      <h2>Admin</h2>
      <AccountDetails userInfo={user} />
      <RecentTransactions userInfo={user} />
    </div>
  );
};

export default Admin;
