import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../Auth";
export default function DashboardLayout() {
  const auth = useAuth();
  const userData = auth.user;
  console.log("dasshhbooard");
  console.log(userData.isLoggedIn);
  console.log(userData.accountType);
  function handleLogout() {
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
                <i class="fa-solid fa-users-gear"></i>
              </Link>
            </li>
          )}
          {userData.accountType === "user" && (
            <li className="nav--account" title="Account">
              <Link to="./account">
                <i class="fa-solid fa-user-vneck"></i>
              </Link>
            </li>
          )}
          {userData.accountType === "admin" && (
            <li className="nav--create-acount" title="Register">
              <Link to="./register">
                <i class="fa-solid fa-user-plus"></i>
              </Link>
            </li>
          )}
          <li className="nav--deposit" title="Deposit">
            <Link to="./deposit">
              <i class="fa-solid fa-piggy-bank"></i>
            </Link>
          </li>
          <li className="nav--withdraw" title="Withdraw">
            <Link to="./withdraw">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </Link>
          </li>
          <li className="nav--transfer" title="Transfer">
            <Link to="./transfer">
              <i class="fa-solid fa-money-bill-transfer"></i>
            </Link>
          </li>
        </ul>
        <button className="nav--logout" onClick={handleLogout} title="Log Out">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </nav>
      <div>DashboardLayout</div>
      <Outlet />
    </>
  );
}
