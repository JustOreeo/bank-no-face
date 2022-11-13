import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../static/Sidebar";
import Greeting from "../static/Greeting";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("loggedInUser");
  const users = localStorage.getItem("users");
  //function that checks if there's an admin user then saves it on to localStorage
  if (!users) {
    const admin = [
      {
        name: "Admin Admin",
        email: "admin@admin",
        password: "12345678",
        role: "Admin",
        balance: "100",
      },
    ];
    localStorage.setItem("users", JSON.stringify(admin));
    console.log("admin?");
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userLists = JSON.parse(localStorage.getItem("users"));
  // console.log("LogggedInUser", loggedInUser);
  // console.log("UserLists", userLists);
  // //console.log("LogggedInUser Email: ", loggedInUser.email);

  // //finds the user and get its value
  let currentUser;
  userLists.forEach((user) => {
    if (user.email === loggedInUser.email) {
      console.log("User Email", user.email);
      currentUser = user;
    }
  });
  // //check current user
  // console.log("Current User: ", currentUser);
  // console.log("Current User Email: ", currentUser.email);

  return auth ? (
    <>
      <div
        className="flex flex-row"
        data-role={
          currentUser.role && currentUser.role === "Admin" ? "admin" : "user"
        }
      >
        <Sidebar />
        <div className="p-4">
          <Greeting />
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
