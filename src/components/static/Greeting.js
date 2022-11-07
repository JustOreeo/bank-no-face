import React,{useState, useEffect} from 'react'

const Name = () => {
    const [name, setName] = useState("");
   
    useEffect(() => {
        //gets user stored info 
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
        const userLists = JSON.parse(localStorage.getItem('users'))      
        console.log("LogggedInUser",loggedInUser)
        console.log("UserLists",userLists);
        console.log("LogggedInUser Email: ",loggedInUser.email) 

         //finds the user and set its name 
        userLists.forEach(user => {
          if(user.email === loggedInUser.email) {
              setName(user.name);
          }
          })   
    }, []);

  return (
    <div>Welcome back, {name} !</div>
  )
}

export default Name;