import React from "react";
import { demoRecentTransactions } from "../../constants/demoRecentTransactions";

const Transactions = ({ userInfo, showTransaction }) => {
  console.log("Recent Transactions User Info: ", userInfo);
  console.log("Recent Transactions User Role: ", userInfo.role);
  console.log("Recent Transactions User Email: ", userInfo.email);
  console.log("Show Transaction: ", showTransaction);
  const recentTransactions = demoRecentTransactions;
  let userTransactions = [];
  recentTransactions.forEach((user, index) => {
    console.log("Lenght:", userTransactions.length);
    //get only the transactions from user here
    if (user.from === userInfo.email && userInfo.role === "User") {
      console.log("CHECK:", index);
      console.log("User Email", user.from);
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
  //reverse to get the latest transaction on top
  userTransactions.reverse();
  //check user transactions
  console.log("Transactions Current User: ", userTransactions);
  //headers for table
  const headers = Object.keys(userTransactions[0]);
  //rows value
  const transactionsInfo = Object.values;

  return (
    <div className="transactions">
      <div className="flex gap-4 justify-content">
        <span>{showTransaction !== "All" && "Recent"}Transactions</span>
        {showTransaction !== "All" && (
          <button className="btn btn-xs">View More</button>
        )}
      </div>
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
      </div>
    </div>
  );
};

export default Transactions;
