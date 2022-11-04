import { NavLink } from "react-router-dom";
import { sideMenu } from "../../constants/sideMenu";

const Sidebar = () => {
    const menuItem = sideMenu

    return (
        <>
            <div className="py-2 px-2 border-solid border-4 h-screen"> 
                { menuItem.map((item, index) => (
                        <li  key={index} className="no-underline flex flex-row">
                            <NavLink  to={item.path}  className=" hover:bg-blue-400 active:bg-blue-700 py-2 border-solid border-2 rounded-lg w-44 m-1 text-center">
                                <div>{item.name}</div>
                            </NavLink>
                        </li>
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar;