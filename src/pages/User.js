import React from "react";
import AccountDetails from "../components/common/AccountDetails";
import Transactions from "../components/common/Transactions";
const User = ({ user }) => {
  console.log("User Info: ", user);
  console.log("User Role: ", user.role);

  return (
    <div className="user-page">
      <h2>User</h2>
      <AccountDetails userInfo={user} />
      <Transactions userInfo={user} />
    </div>
  );
};

export default User;
