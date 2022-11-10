import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../Auth";

const DashboardLayout = () => {
  const auth = useAuth();
  const userData = auth.user;
  console.log("dasshhbooard");
  console.log(userData.isLoggedIn);
  console.log(userData.accountType);
  const handleLogout = () => {
    auth.logout(userData);
  }
  return (
    <>
      <nav className="main-nav">
        {/* <label htmlFor="nav-toggle">&#9868;</label>
        <input type="checkbox" id="nav-toggle" /> */}
        <ul>
          {userData.accountType === "admin" && (
            <li className="nav--admin" title="Admin">
              <Link to="./admin">
                <i className="fa-solid fa-users-gear"></i>
              </Link>
            </li>
          )}
          {userData.accountType === "user" && (
            <li className="nav--account" title="Account">
              <Link to="./account">
                <i className="fa-solid fa-user-vneck"></i>
              </Link>
            </li>
          )}
          {userData.accountType === "admin" && (
            <li className="nav--create-acount" title="Register">
              <Link to="./register">
                <i className="fa-solid fa-user-plus"></i>
              </Link>
            </li>
          )}
          <li className="nav--transfer" title="Transfer">
            <Link to="./transfers">
              <i className="fa-solid fa-money-bill-transfer"></i>
            </Link>
          </li>
        </ul>
        <button className="nav--logout" onClick={handleLogout} title="Log Out">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </nav>
      <div>DashboardLayout</div>
      <Outlet />
    </>
  );
}

export default DashboardLayout;
