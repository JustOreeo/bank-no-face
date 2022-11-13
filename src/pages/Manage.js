import React, { useEffect, useState } from "react";
import Depo from "../components/ManageAccounts/Deposit";
import SelectAccount from "../components/ManageAccounts/SelectAccount";
import With from "../components/ManageAccounts/Withdraw";
import { demoUsers } from "../constants/demoUsers";

const Manage = () => {
  //Load accounts from the localStorage
  //check if user from local storage is not empty
  const checkAccounts=JSON.parse(localStorage.getItem("users"));
  let setAccounts="";
  if(checkAccounts){
    setAccounts=checkAccounts
  }
  //let loadAccounts = Array.from(JSON.parse(localStorage.getItem("accounts")));
  let loadAccounts = Array.from(setAccounts);
  // UseState to store data
  const [accounts, setMyAccounts] = useState(loadAccounts);
  const [email, setEmail] = useState();
  const [balance, setBalance] = useState([]);
  const [input, setInput] = useState("");

  //Auto update localStorage whenever the balance useState is changed
  useEffect(() => {
    accounts.map((account) => {
      if (email === account.email) {
        account.balance = balance;
      }
    });
    //localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("users", JSON.stringify(accounts));
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
        input={input}
      />
    </>
  );
};

export default Manage;
