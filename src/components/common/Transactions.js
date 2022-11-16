import React, { useState, useEffect } from "react";
import { demoRecentTransactions } from "../../constants/demoRecentTransactions";
import { sideMenu } from "../../constants/sideMenu";
import { NavLink } from "react-router-dom";

const Transactions = ({ userInfo, showTransaction }) => {
  console.log("Recent Transactions User Info: ", userInfo);
  console.log("Recent Transactions User Role: ", userInfo.role);
  console.log("Recent Transactions User Email: ", userInfo.email);
  console.log("Show Transaction: ", showTransaction);
  const [empty, setEmpty] = useState("");

  const menuItem = sideMenu;
  /*console.log(
    "AJSKDGKADGADSADSaaADSHJADSHJADSHJADSHJADSHJADSHJADSHJADSHJADSHADS",
    menuItem
  );*/
  //check if history from local storage is not empty
  const checkHistory = JSON.parse(localStorage.getItem("history"));
  let setUserHistory = "";
  if (checkHistory) {
    setUserHistory = checkHistory;
  }
  //const getHistory = Array.from(JSON.parse(localStorage.getItem('history')))
  const getHistory = Array.from(setUserHistory);
  const [history, setHistory] = useState(getHistory);
  const recentTransactions = history;
  let userTransactions = [];
  if (history) {
    recentTransactions.map((user) => {
      // console.log("Lenght:", userTransactions.length);
      //get only the transactions from user here
      if (user.sender === userInfo.email && userInfo.role === "User") {
        // console.log("CHECK:", index);
        // console.log("User Email", user.from);
        //filter to 5 transactions only
        if (showTransaction === "All") {
          userTransactions.push(user);
        } else {
          if (userTransactions.length < 5) {
            userTransactions.push(user);
          }
        }
      }
      //if admin all transactions
      if (userInfo.role === "Admin") {
        if (showTransaction === "All") {
          userTransactions.push(user);
        } else {
          if (userTransactions.length < 5) {
            userTransactions.push(user);
          }
        }
      }
    });
  }

  useEffect(() => {
    if (userTransactions.length === 0) {
      setEmpty("true");
    } else {
      setEmpty("false");
    }
  });

  let transactionsInfo;
  if (userTransactions.length !== 0) {
    //reverse to get the latest transaction on top
    userTransactions.reverse();
    //check user transactions
    console.log("Transactions Current User: ", userTransactions);

    //rows value
    transactionsInfo = Object.values;
  }
  return (
    <div className="transactions">
      <div className="flex gap-4 justify-content items-center">
        <span className="component-header">
          {showTransaction !== "All" && "Recent "}Transactions
        </span>
        {showTransaction !== "All" && empty === "false" && (
          <NavLink className="green-button view-more" to={menuItem[1].path}>
            View More
          </NavLink>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-compact text-center">
          <thead>
            <tr>
              <th></th>
              <th>Created by</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
            </tr>
          </thead>

          <tbody>
            {userTransactions.map((item, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                {transactionsInfo(item).map((value) => (
                  <td>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {empty === "true" && (
          <table className="flex justify-center">
            <tr>
              <td>No transactions yet</td>
            </tr>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;
