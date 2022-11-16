import React from "react";
import Admin from "../pages/Admin";
import User from "../pages/User";
import useProfile from "../components/hooks/useProfile";
const Dashboard = () => {
  const { user } = useProfile();
  console.log(user);
  return (
    <div className="dashboard">
      <p className="dash-title component-header">Dashboard</p>
      {user.role === "Admin" && <Admin userInfo={user} />}
      {user.role === "User" && <User userInfo={user} />}
    </div>
  );
};

export default Dashboard;
