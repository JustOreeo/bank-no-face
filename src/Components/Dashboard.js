import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        navigate("/login");
    }
    
    return (
        <div>
            DASHBOARD
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Dashboard
