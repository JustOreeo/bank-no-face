import React from "react";
import { sideMenu } from "../../constants/sideMenu";
import { NavLink, useNavigate } from "react-router-dom";

const AdminDash = () => {
  const menuItem = sideMenu;
  return (
    <div className="admin-dash">
      <div className="dash-overview">
        <p className="count">{"200"}</p>
        <p className="count-label">Total Number of {"Users"}</p>
        <i className="fa-solid fa-user-tie"></i>
      </div>
      <div className="quick-link">
        <NavLink to={menuItem[2].path}>{menuItem[2].name}</NavLink>
      </div>
    </div>
  );
};

export default AdminDash;
