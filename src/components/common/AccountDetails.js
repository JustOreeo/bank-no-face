import React from "react";

const AccountDetails = ({ userInfo }) => {
  //map into array with specific properties
  const users={
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role
  }
  
  //headers for table
  const headers = Object.keys(users);
  //rows value
  const userValues = Object.values;
  return (
    <div className="account-details">
      <h2 className="component-header">Account Details</h2>
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
  );
};

export default AccountDetails;
