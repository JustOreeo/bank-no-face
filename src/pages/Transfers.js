import React from "react";
import useProfile from "../components/hooks/useProfile";
import AdminTransfer from "../components/Transfers/AdminTransfer";
import UserTransfer from "../components/Transfers/UserTransfer";
const Transfers = () => {
  const { user } = useProfile();
  console.log(user);

  return (
    <div>
      {user.role === "Admin" && <AdminTransfer />}
      {user.role === "User" && <UserTransfer userInfo={user} />}
    </div>
  );
};

export default Transfers;
