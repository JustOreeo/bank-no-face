import { NavLink } from "react-router-dom";
import { sideMenu } from "../../constants/sideMenu";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
    const menuItem = sideMenu
    const navigate = useNavigate();

    const handleLogout = () => {
        //localStorage.removeItem("loggedIn");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem('accounts');
        navigate("/login");
    }
    
    return (
        <>
            <nav className="main-nav">
                <ul>
                    {menuItem.map((item, index) => (
                    <li  key={index}>
                        <NavLink  to={item.path}  className="">
                            <i className={`${item.name==="Dashboard"&&"fa-solid fa-chart-line"}
                                ${item.name==="Transaction"&&"fa-solid fa-table-list"}
                                ${item.name==="Create Account" ? "fa-solid fa-user-plus" : ""}
                                ${item.name==="Users" ? "fa-solid fa-users-gear" : ""}
                                ${item.name==="Manage" ? "fa-solid fa-vault" : ""}
                                ${item.name==="Transfers" ? "fa-solid fa-money-bill-transfer" : ""}
                                ${item.name==="Expenses" ? "fa-solid fa-wallet" : ""}`
                                }>
                            </i>
                        </NavLink>
                    </li>    
                    ))}
                </ul>
                <button className="nav--logout" onClick={handleLogout} title="Log Out">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </nav>
        </>
    )
}

export default Sidebar;