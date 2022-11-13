import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../static/Sidebar";
import Greeting from "../static/Greeting";
import  useProfile,{ ProfileContext} from '../hooks/useProfile';
const ProtectedRoutes = () => {
  const {user, setUser} = useProfile();
  const auth = localStorage.getItem("loggedInUser")
  const users= JSON.parse(localStorage.getItem('users'))
  //function that checks if there's an admin user then saves it on to localStorage
  if(!users){
      const admin=[{name: "Admin Admin",email: "admin@admin",password: "12345678",balance: 100 ,role: "Admin"}];
      localStorage.setItem("users", JSON.stringify(admin));
      // console.log("admin?");
  }        
  // console.log("Users: ",users);

  return auth ? 
      <>  
          <ProfileContext.Provider value={{ user, setUser }}>
              <div className="flex flex-row"
              data-role={
                user.role && user.role === "Admin" ? "admin" : "user"
              }
            >
                  <Sidebar />
                  <div className='p-4'>
                      <Greeting />
                      <Outlet />
                  </div> 
              </div>
          </ProfileContext.Provider>
      </>
      : <Navigate to="/login"/>
}

export default ProtectedRoutes;