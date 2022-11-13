import React, { useEffect, useState } from "react";
import Depo from "../components/ManageAccounts/Deposit";
import SelectAccount from "../components/ManageAccounts/SelectAccount";
import With from "../components/ManageAccounts/Withdraw";
import { demoUsers } from "../constants/demoUsers";

const Manage = () => {
  //Load accounts from the localStorage
  //check if user from local storage is not empty
  const storedAccounts=JSON.parse(localStorage.getItem("users"));
  let setAccounts="";
  if(storedAccounts){
    setAccounts=storedAccounts
  }
  //let loadAccounts = Array.from(JSON.parse(localStorage.getItem("accounts")));
  let loadAccounts = Array.from(setAccounts);
  //check if history from local storage is not empty
  const checkHistory=JSON.parse(localStorage.getItem("history"));
  let setUserHistory=[];
  if(checkHistory){
  setUserHistory=checkHistory
  }
  //const loadHistory = Array.from(JSON.parse(localStorage.getItem('history')))
  const loadHistory = Array.from(setUserHistory)
  let getUser = JSON.parse(localStorage.getItem('loggedInUser'))

  // UseState to store data
  const [accounts, setMyAccounts] = useState(loadAccounts);
  const [email, setEmail] = useState();
  const [balance, setBalance] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(loadHistory)
  const [user] = useState(getUser.email)
  //Auto update localStorage whenever the balance useState is changed
  useEffect(() => {
    storedAccounts.map((account) => {
      if (email === account.email) {
        account.balance = balance;
      }
    });
    
    //localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("users", JSON.stringify(storedAccounts));
    const reloadAccounts = Array.from(
      JSON.parse(localStorage.getItem("users"))
    );
    setMyAccounts(reloadAccounts);
  }, [balance]);

  return (
    <>
      <h1 className="mb-2 component-header">Manage Accounts</h1>
      <SelectAccount
        accounts={accounts}
        setEmail={setEmail}
        email={email}
        setBalance={setBalance}
        balance={balance}
        setInput={setInput}
        history={history}
        setHistory={setHistory}
        input={input}
        user={user}
      />
    </>
  );
};

export default Manage;
