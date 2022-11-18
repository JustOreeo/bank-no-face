import React,{useState,useEffect} from 'react'
import { sideMenu } from "../../constants/sideMenu";
import { NavLink } from "react-router-dom";
import Dialog from "../common/Dialog";
import CardManager from "../common/CardManager";

const UserTransfer = ({ userInfo }) => {
  const storedAccounts = JSON.parse(localStorage.getItem("users"));
  let getUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const storedRecipients=JSON.parse(localStorage.getItem("recipients"));
  const menuItem = sideMenu;
  const [dialogue, setDialogue] = useState({
    message: "",
    isLoading: false,
  });
  const handleDialog = (message, isLoading) => {
    setDialogue({ message, isLoading });
  };

  //check if history from local storage is not empty
  const checkHistory = JSON.parse(localStorage.getItem("history"));
  let setUserHistory = [];
  if (checkHistory) {
    setUserHistory = checkHistory;
  }
  //set Source balance
  let userBalance;
  storedAccounts.map((account) => {
    if (account.email === getUser.email) {
      console.log("Source Money", account.balance);
      userBalance = account.balance;
    }
  });
  const loadHistory = Array.from(setUserHistory);

  // UseState to store data
  const [sourceEmail] = useState(getUser.email);
  const [targetEmail, setTargetEmail] = useState("");
  const [sourceBalance, setSourceBalance] = useState(userBalance);
  const [targetBalance, setTargetBalance] = useState();
  const [input, setInput] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [history, setHistory] = useState(loadHistory);
  const [user] = useState(getUser.email);
  const [error, setError] = useState("");

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

  //Set Target Balance
  useEffect(() => {
    if (targetEmail) {
      storedAccounts.map((account) => {
        if (targetEmail === account.email) {
          console.log("Target Source", account.balance);
          setTargetBalance(account.balance);
        }
      });
    }

    console.log("Who is the target", targetEmail);
  }, [targetEmail]);
  //Auto update localStorage whenever the balance useState is changed
  //for updating the source account (user)
  useEffect(() => {
    storedAccounts.map((account) => {
      if (sourceEmail === account.email) {
        account.balance = sourceBalance;
      }
    });
    console.log("New source balance: ", sourceBalance);
    localStorage.setItem("users", JSON.stringify(storedAccounts));
  }, [sourceBalance]);

  //for updating the target account (user)
  useEffect(() => {
    storedAccounts.map((account) => {
      if (targetEmail === account.email) {
        account.balance = targetBalance;
      }
    });
    console.log("New target balance: ", targetBalance);
    localStorage.setItem("users", JSON.stringify(storedAccounts));
  }, [targetBalance]);

  //saving in  history
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  //Capture Input Amount
  const inputHandler = (e) => {
    const input = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    setInput(input);
    storedAccounts.forEach((account) => {
      if (account.email === getUser.email) {
        console.log("Your new balance", account.balance - input);
        setNewBalance(account.balance - input);
      }
    });
  };
  //Capture Target Email
  const emailHandler = (e) => {
    //if user does not exists
    let found = false;
    const email = e.target.value;
    console.log("Eto email", email);
    storedAccounts.forEach((user) => {
      if (user.email === email) {
        found = true;
        return;
      }
    });
    if (found === true) {
      setError("");
      console.log("User exists");
      setTargetEmail(email);
    } else {
      setError("User does not exists");
      console.log("User does not exists");
    }
  };
  //When transferring
  const transferHandler = (e) => {
    handleDialog("transfer?", true);
  };
  console.log("check:", storedAccounts);

  const transferConfirmation = (transferConfirm) => {
    if (transferConfirm) {
      setError("");
      if (input === "" || targetEmail === "") {
        alert("Please enter to all fields to proceed");
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
            sender: `${user}`,
            receiver: `${targetEmail}`,
          },
        ]);
      }
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  
   //if recipient is empty
   if (storedRecipients === null) {
    localStorage.setItem("recipients", JSON.stringify([]));
  }
  const targetRecipientHandler = (e) => {   
      const targetUser = e.target.value
      console.log("target",targetUser)
      setTargetEmail(targetUser)

  }
  console.log(storedRecipients)
  return (
    <>
      <div className="user-transfers">
        <h2 className="component-header">Transfer</h2>
        <CardManager userInfo={userInfo} sourceBalance={sourceBalance} />
        <div className="transfer-section">
          <div className="flex flex-col ">
            {/* <div>Balance: {sourceBalance}</div> */}
               <label className='text-xs'>Select from a recipient</label>
                <select className="select w-full max-w-xs" onChange={targetRecipientHandler}>
                   <option>Select from a recipient</option>
                    {storedRecipients.map((recipient) => { return(
                        <option key={recipient.id} value={recipient.recipientEmail} >{recipient.recipientName}</option>
                    )})}
                  
                {storedRecipients.length===0&& <option>No recipients yet</option>}
                </select>
               
                {storedRecipients.length===0&& 
                    <NavLink className="" to={menuItem[7].path}>
                    Add Recipient
                    </NavLink>
                }
            <input
              placeholder="Transfer to"
              onChange={(e) => emailHandler(e)}
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
            />

            <div className="pt-5 pb-5">
              <input
                maxLength="6"
                placeholder="Amount"
                value={input}
                type="text"
                onChange={(e) => inputHandler(e)}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              />
            </div>
            {newBalance && <div>Your New Balance would be {newBalance}</div>}
            <div className="errorMsg">{error}</div>
            <button className="green-button" onClick={transferHandler}>
              Transfer
            </button>
          </div>
        </div>
      </div>

      {dialogue.isLoading && (
        <Dialog onDialog={transferConfirmation} message={dialogue.message} />
      )}
    </>
  );
};

export default UserTransfer;
