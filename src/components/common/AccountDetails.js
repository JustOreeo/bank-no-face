import React from 'react'

const AccountDetails = ({userInfo}) => {
    console.log("Account Details User Info: ",userInfo)
    console.log("Account Details User Role: ",userInfo.role)
    //map into array with specific properties
    const users={
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role
    }

    console.log("Checkkkkkkkkkkkkkkk:",users)
    //headers for table
    const headers=Object.keys(users);
    //rows value
    const userValues=Object.values;
  return (
    <div>AccountDetails
        <div className="overflow-x-auto">
            <table className="table table-compact text-center">
                <tbody>
                <tr>
                    <th>Account Name</th>
                    <td>{users.name}</td>
                </tr>
                <tr>
                    <th>Account Email</th>
                    <td>{users.email}</td>
                </tr>
                <tr>
                    <th>Account Role</th>
                    <td>{users.role}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AccountDetails