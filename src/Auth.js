import {useState, createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';
const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
console.log(loggedInUser)
//const [user,setUser]=useState(null)
const [user,setUser]=useState(() => {
    if (loggedInUser!==null) {
      return loggedInUser;
    }
    return {accountType:"guest",isLoggedIn:false};
});
const navigate=useNavigate();

const login=(user)=>{
    user.isLoggedIn=true;
    setUser(user)
    localStorage.setItem("loggedInUser",JSON.stringify(user))
    console.log("user")
    if(user.accountType==="admin"){ 
        console.log("addminnn")
        navigate('/dashboard/admin')//testing
        //navigate('/dashboard/admin',{replace:true})//with replace or not
    }
    if(user.accountType==="user"){ 
        console.log("useeer")
        navigate('/dashboard/account')
    }
}
const logout=(user)=>{
    user.isLoggedIn=false;
    setUser(user)
    //update local storage or delete 
    localStorage.setItem("loggedInUser",JSON.stringify(user))
    navigate('/')
}
return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>;
};
//function that returns the value of authcontext //other components use this to put value or access its value
export const useAuth = () => {
    return useContext(AuthContext);
};