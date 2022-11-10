import {useState, createContext, useContext,useEffect } from "react";

const useProfile=()=>{
    const [user, setUser] = useState('');
    const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
    const users= JSON.parse(localStorage.getItem('users'))
    //function that checks if there's an admin user then saves it on to localStorage
    if(!users){
        const admin=[{name: "Admin Admin",email: "admin@admin",password: "12345678",balance: "100",role: "Admin"}];
        localStorage.setItem("users", JSON.stringify(admin));
        console.log("admin?");
    }        
    console.log("Users: ",users);
       
    useEffect(() => {
    if (loggedInUser) {
        console.log("LogggedInUser: ",loggedInUser)
        console.log("LogggedInUser Email: ",loggedInUser.email)
        //finds the user and get its value 
        users.forEach(user => {
            if(user.email === loggedInUser.email) {
                console.log("User Email",user.email)
                console.log("check",user);
                setUser(user)
               
            }
        })
    }
    }, []);
    console.log("User check",user)
    return {user, setUser}
};

export const ProfileContext=createContext(null);
export const useProfileContext = () => useContext(ProfileContext);
export default useProfile 