import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../static/Sidebar';
import Greeting from '../static/Greeting';

const ProtectedRoutes = () => {
    const auth = localStorage.getItem("loggedInUser")
    //function that checks if there's an admin user then saves it on to localStorage
    if(!auth){
        const admin=[{name: "Admin Admin",email: "admin@admin",password: "12345678",role: "Admin",balance: "100"}];
        localStorage.setItem("users", JSON.stringify(admin));
        console.log("admin?");
    }
          
    return auth ? 
        <>
            <div className="flex flex-row">
                <Sidebar />
                <div className='p-4'>
                    <Greeting />
                    <Outlet />
                </div>
                
            </div>
        </>
        : <Navigate to="/login"/>
}

export default ProtectedRoutes;
