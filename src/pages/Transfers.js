import React, { useState, useEffect } from "react";
import SelectAccount from "../components/ManageAccounts/SelectAccount";
import SourceAccount from "../components/Transfers/SourceAccount";
import TargetAccount from "../components/Transfers/TargetAccount";
import Dialog from "../components/common/Dialog";

const Transfers = () => {
  const [dialogue, setDialogue] = useState({
    message: "",
    isLoading: false,
  });

  const handleDialog = (message, isLoading) => {
    setDialogue({ message, isLoading });
  };

  //Load accounts from the localStorage
  //check if user from local storage is not empty
  const storedAccounts = JSON.parse(localStorage.getItem("users"));
  let setAccounts = "";
  if (storedAccounts) {
    setAccounts = storedAccounts;
  }
  //get all users except admin
  const getAccounts = [];
  setAccounts.forEach((user) => {
    if (user.role !== "Admin") {
      getAccounts.push(user);
    }
  });
  console.log(getAccounts);

  //const accounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
  let accounts = Array.from(getAccounts);

  //check if history from local storage is not empty
  const checkHistory = JSON.parse(localStorage.getItem("history"));
  let setUserHistory = [];
  if (checkHistory) {
    setUserHistory = checkHistory;
  }
  //const loadHistory = Array.from(JSON.parse(localStorage.getItem('history')))
  const loadHistory = Array.from(setUserHistory);
  let getUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // UseState to store data
  const [sourceEmail, setSourceEmail] = useState();
  const [targetEmail, setTargetEmail] = useState();
  const [sourceBalance, setSourceBalance] = useState([]);
  const [targetBalance, setTargetBalance] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(loadHistory);
  const [user] = useState(getUser.email);

  // save input value to a variable
  const enteredAmount = input;

  // Timestamp
  const currentDate = Date.now(); // This would be the timestamp you want to format

  const timeStamp = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(currentDate);

  const dateStamp = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(currentDate);

  //Auto update localStorage whenever the balance useState is changed
  useEffect(() => {
    storedAccounts.map((account) => {
      if (sourceEmail === account.email) {
        account.balance = sourceBalance;
      }
    });
    /* const users = JSON.parse(localStorage.getItem("users"));
    let found=false;
    users.filter(user => {
        if(user.role==="Admin"){
            found=true;
        }
    });
    if(found===false){
        accounts.splice(0,0,{name: "Admin Admin",email: "admin@admin",password: "12345678",balance: 100 ,role: "Admin"})
    }
*/

    localStorage.setItem("users", JSON.stringify(storedAccounts));
  }, [sourceBalance]);

  useEffect(() => {
    storedAccounts.map((account) => {
      if (targetEmail === account.email) {
        account.balance = targetBalance;
      }
    });
    //add admin again
    //accounts.push({name: "Admin Admin",email: "admin@admin",password: "12345678",balance: 100 ,role: "Admin"});
    localStorage.setItem("users", JSON.stringify(storedAccounts));
  }, [targetBalance]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  //Capture Input
  const inputHandler = (e) => {
    const input = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    setInput(input);
  };

  const transferHandler = (e) => {
    handleDialog("confirm transfer?", true);
  };

  const transferConfirmation = (transferChoice) => {
    if (transferChoice) {
      if (input === "") {
        alert("Please enter an amount to proceed");
      } else if (input < 500) {
        alert(
          "Minimum transfer amount reached. Please enter an amount that is equal or greater than 500 pesos"
        );
      } else if (input > 500000) {
        alert(
          "Maximum transfer amount reached. Please enter an amount that is equal or lower than 500000 pesos"
        );
      } else if (sourceEmail === targetEmail && input > 500 && input < 500000) {
        alert(
          "Source account is the same as the target account. Please select a different target account"
        );
      } else {
        setSourceBalance(sourceBalance - parseInt(input));
        setTargetBalance(targetBalance + parseInt(input));
        setHistory([
          ...history,
          {
            createdby: `${user}`,
            date: `${dateStamp}`,
            time: `${timeStamp}`,
            type: "Transfer",
            amount: `${enteredAmount}`,
            sender: `${sourceEmail}`,
            receiver: `${targetEmail}`,
          },
        ]);
      }
      handleDialog("", false);
      setInput("");
    } else {
      handleDialog("", false);
      return;
    }
  };

  console.log(`This is the source ${sourceEmail}`);
  console.log(`This is the source balance ${sourceBalance}`);

  console.log(`This is the target ${targetEmail}`);
  console.log(`This is the target ${targetBalance}`);
  return (
    <>
      <div className="transfers-page">
        <div className="source-acc">
          <h1>Source Account</h1>

          <SourceAccount
            accounts={accounts}
            sourceEmail={sourceEmail}
            setSourceEmail={setSourceEmail}
            setSourceBalance={setSourceBalance}
            sourceBalance={sourceBalance}
          />
          <div className="acc-details">
            <p className="email">{sourceEmail}</p>
            <p className="balance">{sourceBalance}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="target-acc">
          <h1>Target Account</h1>
          <TargetAccount
            accounts={accounts}
            targetEmail={targetEmail}
            setTargetEmail={setTargetEmail}
            setTargetBalance={setTargetBalance}
            targetBalance={targetBalance}
          />
          <div className="acc-details">
            <p className="email">{targetEmail}</p>
            <p className="balance">{targetBalance}</p>
          </div>
        </div>
        <div className="transfer-buttons flex flex-col border-solid border-2 ">
          <label>Transfer Amount:</label>
          <input
            maxLength="6"
            value={input}
            type="text"
            onChange={(e) => inputHandler(e)}
            placeholder="0.00"
          />
          <button className="green-button" onClick={transferHandler}>
            Transfer
          </button>
        </div>
      </div>
      {dialogue.isLoading && (
        <Dialog onDialog={transferConfirmation} message={dialogue.message} />
      )}
    </>
  );
};

export default Transfers;
