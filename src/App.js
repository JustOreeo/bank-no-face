import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoutes from './components/services/ProtectedRoutes';
import CreateAccount from './pages/CreateAccount';
import Users from './pages/Users';
import Transfers from './pages/Transfers';
import Manage from './pages/Manage';
import Transaction from './pages/Transaction';
import Expense from './pages/Expense';
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
                        <Route path="/manage" element={<Manage />} />
                        <Route path="/transfers" element={<Transfers />} />
                        <Route path="/expenses" element={<Expense />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
