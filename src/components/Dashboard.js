import React from "react";
import Admin from "../pages/Admin";
import User from "../pages/User";

const Dashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userLists = JSON.parse(localStorage.getItem("users"));
  //finds the user and get its value
  let currentUser;
  userLists.forEach((user) => {
    if (user.email === loggedInUser.email) {
      currentUser = user;
    }
  });
  //check current user
  console.log("Current User: ", currentUser);
  return (
    <div className="dashboard">
      <p className="dash-title">Dashboard</p>
      {currentUser.role === "Admin" && <Admin user={currentUser} />}
      {currentUser.role === "User" && <User user={currentUser} />}
    </div>
  );
};

export default Dashboard;
