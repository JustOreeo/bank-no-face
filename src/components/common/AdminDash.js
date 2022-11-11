import React from "react";
import { sideMenu } from "../../constants/sideMenu";
import { NavLink, useNavigate } from "react-router-dom";

const AdminDash = () => {
  const menuItem = sideMenu;

  const userList = JSON.parse(localStorage.getItem("users"));

  console.log(
    "AJSKDGKADGADSADSADSHJADSHJADSHJADSHJADSHJADSHJADSHJADSHJADSHADS",
    userList
  );
  return (
    <div className="admin-dash">
      <div className="dash-overview">
        <p className="count">
          {userList && userList.length > 0 ? userList.length - 1 : 0}
        </p>
        <p className="count-label">Total Number of {"Users"}</p>
        <i className="fa-solid fa-user-tie"></i>
      </div>

      <NavLink className="quick-link" to={menuItem[2].path}>
        {menuItem[2].name}
      </NavLink>
    </div>
  );
};

export default AdminDash;
