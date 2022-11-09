import React, { useState,useEffect } from 'react'
import { demoUsers } from '../constants/demoUsers';
import AccountDetails from '../components/common/AccountDetails'
import Transactions from '../components/common/Transactions'
const Users = () => {
    const [userSelected,setUserSelected]=useState("")
    const [showUserDetails,setShowUserDetails]=useState("")
    const userList = JSON.parse(localStorage.getItem("users"))

    //remove admin from users list
    userList.splice(0,1);

    //show users
    useEffect(() => {
        console.log("Show user: ",showUserDetails)
    }, [showUserDetails]);

    //map into array with specific properties
    const users= userList.map(user => ({ 
        name: user.name,
        email: user.email,
        balance: user.balance
    }));

    //headers for table
    const headers=Object.keys(users[0]);
    //rows value
    const userInfo=Object.values;

    //Get user info when selected
    const handleGetUser = (selectedUser) => {
        //find user and set it again to get other keys like role
        userList.forEach(user => {
            if(user.email === selectedUser.email) {
            console.log("Selected User: ",user)
            setUserSelected(user)
            }
        })
        setShowUserDetails("true");
        }
    return (
        <>
        <div className=''>
            Users
            <div className="overflow-x-auto">
                <table className="table table-compact text-center">
                    <thead>
                        <tr>
                            <th></th>
                            {headers.map((key) => (
                            <th>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((item,index) => (
                    <tr key={index} onClick={()=>{handleGetUser(item)}} className="hover">
                        <th>{index+1}</th>
                        {userInfo(item).map((value) => (
                            <td>{value}</td>
                        ))}
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showUserDetails==="true"&&
                <>
                    <AccountDetails userInfo={userSelected}/>
                    <Transactions userInfo={userSelected}/>
                </>
            }
        </div>
        
        </>
    )
}

export default Users
