import React, {useEffect, useState} from 'react'
import { useFetcher } from 'react-router-dom';
import ManageAccount from './ManageAccount'

const SelectAccount = ({accounts, setEmail, setBalance, email, balance, setInput, input,
history, setHistory, user}) => {
  const [empty, setEmpty] = useState("");
  //get all users except admin
  let loadAccounts=[];
  let getAccounts=[];
  let currentUser;
  const currentUserEmail=user;
  accounts.forEach(user => {
    //get current user info
    if(user.email===currentUserEmail){
      currentUser=user;
    }
    if(user.role!=="Admin"){
      if(currentUser.role==="User"&&user.email===currentUserEmail){
        getAccounts.push(user)
      }
      if(currentUser.role==="Admin"){
        getAccounts.push(user);
      }
    }
    
  });
  console.log("Check Accounts: ",getAccounts);
  
  //check if there's no user except admin
  useEffect(() => {
    if (getAccounts.length === 0) {
      setEmpty("true");
    } else {
      setEmpty("false");
    }
    console.log("Accounts length",getAccounts.length)
    console.log("User: ", user)
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
      {empty === "false" && ( 
        <thead>
          <tr>
            <th></th> 
            <th>Name</th> 
            <th>Email</th> 
            <th>Role</th>
            <th>Balance</th> 
            <th>Manage</th> 
          </tr>
        </thead> )}
        <tbody>
          {getAccounts.map((account, index) => {return (
          <tr key={index} >
            <th >{index+1}</th> 
            <td>{account.name}</td> 
            <td>{account.email}</td>
            <td>{account.role}</td>
            <td>&#8369;{account.balance.toLocaleString(undefined, {maximumFractionDigits: 2})}</td> 
            <td>
              <ManageAccount 
              id={account.email} 
              setEmail={setEmail}
              email={email} 
              setBalance={setBalance} 
              balance={balance}
              setInput={setInput}
              history={history}
              setHistory={setHistory}
              input={input}
              accounts={accounts}
              user={user}/>
            </td> 
            
          </tr>
          )})}
          {empty === "true" && ( 
          <tr>
              <td>No users yet</td>
          </tr>    
          )}  
        </tbody> 
      </table>
    </div>
    )
  }
  
  export default SelectAccount