import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoutes from './components/services/ProtectedRoutes';
import CreateAccount from './pages/CreateAccount';
import Deposit from './pages/Deposit';
import Users from './pages/Users';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';
import Transaction from './pages/Transaction';
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* Protected Routes */}
                    <Route path="/" element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transaction />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/deposit" element={<Deposit />} />
                        <Route path="/withdraw" element={<Withdraw />} />
                        <Route path="/transfer" element={<Transfer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
