import React from "react";
import { demoRecentTransactions } from "../../constants/demoRecentTransactions";

const RecentTransactions = ({ userInfo }) => {
  console.log("Recent Transactions User Info: ", userInfo);
  console.log("Recent Transactions User Role: ", userInfo.role);
  console.log("Recent Transactions User Email: ", userInfo.email);
  const recentTransactions = demoRecentTransactions;
  let userTransactions = [];
  recentTransactions.forEach((user) => {
    //get only the transactions from user here
    if (user.from === userInfo.email && userInfo.role === "User") {
      console.log("User Email", user.from);
      userTransactions.push(user);
    }
    //if admin all transactions
    if (userInfo.role === "Admin") {
      userTransactions.push(user);
    }
  });
  //check user transactions
  console.log("Transactions Current User: ", userTransactions);
  //headers for table
  const headers = Object.keys(userTransactions[0]);
  //rows value
  const transactionsInfo = Object.values;

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
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

export default RecentTransactions;
