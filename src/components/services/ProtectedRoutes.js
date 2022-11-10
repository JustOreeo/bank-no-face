import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../static/Sidebar';
import Greeting from '../static/Greeting';
import  useProfile,{ ProfileContext} from '../hooks/useProfile';
const ProtectedRoutes = () => {
    const {user, setUser} = useProfile();
    const auth = localStorage.getItem("loggedInUser")
    return auth ? 
        <>  
            <ProfileContext.Provider value={{ user, setUser }}>
                <div className="flex flex-row">
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
