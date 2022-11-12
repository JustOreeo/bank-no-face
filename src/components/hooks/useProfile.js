import {useState, createContext, useContext,useEffect } from "react";

const useProfile=()=>{
    const [user, setUser] = useState('');
    const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
    const users= JSON.parse(localStorage.getItem('users'))
       
    useEffect(() => {
    if (loggedInUser) {
        // console.log("LogggedInUser: ",loggedInUser)
        // console.log("LogggedInUser Email: ",loggedInUser.email)
        //finds the user and get its value 
        users.forEach(user => {
            if(user.email === loggedInUser.email) {
                // console.log("User Email",user.email)
                // console.log("check",user);
                setUser(user)
               
            }
        })
    }
    }, []);
    // console.log("User check",user)
    return {user, setUser}
};

export const ProfileContext=createContext(null);
export const useProfileContext = () => useContext(ProfileContext);
export default useProfile 