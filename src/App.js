import './assets/App.css';
import Login from './Components/Login';
import DashboardLayout from './Components/DashboardLayout';
import Account from './Components/Account';
import Admin from './Components/Admin';
import CreateAccount from './Components/CreateAccount';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import Transfer from './Components/Transfer';
import React,{useState,useEffect} from 'react';
import {Route, Routes} from "react-router-dom"
import { AuthProvider } from './Auth';
import {RequireAuth} from './Components/RequireAuth'
import {AdminAuth} from './Components/AdminAuth'
const LOCAL_STORAGE_USERS="storedUsers";
function App() {
  const [users, setUsers]=useState([])
  const [admin, setadmin]=useState("")

  //useEffect
  useEffect(()=>{  
    const storedUsers=JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS))
    if(!storedUsers){
      setadmin("false")
    }
    if(storedUsers){
      //if there's a new registered user
      if(storedUsers>1){
        setUsers( prevUsers => [...prevUsers, ...storedUsers] );
      }else{
        setUsers(storedUsers)
      }
    }
    },[])
  
    useEffect(()=>{  
      if(admin==="false"){
        setUsers(prevUsers=>[...prevUsers,{id:1, name:"Admin Admin",email:"admin@gmail.com",password:"01234567",accountType:"admin",balance:0}])
      }
    },[admin])

    useEffect(()=>{
      if(users.length===1){
        localStorage.setItem(LOCAL_STORAGE_USERS,JSON.stringify(users))
      }
    },[users])
 
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login Userlist={users}/>} />
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route path="admin" element={<AdminAuth><Admin Userlist={users}/></AdminAuth>} />
            <Route path="account" element={<RequireAuth><Account /></RequireAuth>} />
            <Route path="register" element={<AdminAuth><CreateAccount /></AdminAuth>} />
            <Route path="deposit" element={<RequireAuth><Deposit /></RequireAuth>} />
            <Route path="withdraw" element={<RequireAuth><Withdraw /></RequireAuth>} />
            <Route path="transfer" element={<RequireAuth><Transfer /></RequireAuth>} /> 
          </Route>
      </Routes> 
    </AuthProvider>
    </>
  )

}

export default App;
