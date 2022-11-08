import React from 'react'
import { demoUsers } from '../constants/demoUsers';
const Users = () => {
    const userList = JSON.parse(localStorage.getItem("users"))
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
                    <tr key={index} className="hover">
                        <th>{index+1}</th>
                        {userInfo(item).map((value) => (
                            <td>{value}</td>
                        ))}
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        </>
    )
}

export default Users
