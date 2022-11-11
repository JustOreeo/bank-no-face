import React from "react";
import AccountDetails from "../components/common/AccountDetails";
import Transactions from "../components/common/Transactions";
import CardManager from "../components/common/CardManager";
const User = ({ userInfo }) => {
  console.log("User Info: ", userInfo);
  console.log("User Role: ", userInfo.role);

  return (
    <div className="user-page">
      <h2>User</h2>
      <CardManager userInfo={userInfo} />
      <AccountDetails userInfo={userInfo} />
      <Transactions userInfo={userInfo} />
    </div>
  );
};

export default User;
