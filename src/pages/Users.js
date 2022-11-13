import React, { useState, useEffect } from "react";
import { demoUsers } from "../constants/demoUsers";
import AccountDetails from "../components/common/AccountDetails";
import Transactions from "../components/common/Transactions";
const Users = () => {
  const [userSelected, setUserSelected] = useState("");
  const [showUserDetails, setShowUserDetails] = useState("");
  const userList = JSON.parse(localStorage.getItem("users"));
  const [empty, setEmpty] = useState("");

  //remove admin from users list
  userList.splice(0, 1);

  //show users
  useEffect(() => {
    console.log("Show user: ", showUserDetails);
  }, [showUserDetails]);

  //check if there is no user
  useEffect(() => {
    if (userList.length === 0) {
      setEmpty("true");
    } else {
      setEmpty("false");
    }
  });
  console.log("Userlist length: ", userList.length);

  //map into array with specific properties
  const users = userList.map((user) => ({
    name: user.name,
    email: user.email,
    balance: user.balance,
  }));

  let userInfo;
  if (users.length !== 0) {
    //rows value
    userInfo = Object.values;
  }
  //Get user info when selected
  const handleGetUser = (selectedUser) => {
    //find user and set it again to get other keys like role
    userList.forEach((user) => {
      if (user.email === selectedUser.email) {
        console.log("Selected User: ", user);
        setUserSelected(user);
      }
    });
    setShowUserDetails("true");
  };
  return (
    <>
      <div className="users-page">
        <h2 className="component-header">Users</h2>
        <div className="overflow-x-auto users-list1">
          <table className="table table-compact text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                </tr>
              </thead>
            <tbody>
              {users.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    handleGetUser(item);
                  }}
                  className="hover"
                >
                  <th>{index + 1}</th>
                  {userInfo(item).map((value) => (
                    <td>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {empty === "true" && (
          <table className="text-center ">
            <tr>
              <td>No Users yet</td>
            </tr>
          </table>
         )}
        </div>
        {showUserDetails === "true" && (
          <>
            <AccountDetails userInfo={userSelected} />
            <Transactions userInfo={userSelected} />
          </>
        )}
      </div>
    </>
  );
};

export default Users;
