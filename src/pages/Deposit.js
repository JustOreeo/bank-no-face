import React from "react";
import Transaction from "../components/common/Transaction";
import {
  disableButton,
  enableButton,
} from "../components/common/InterfaceFunctions";

const Deposit = () => {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const userLists = JSON.parse(localStorage.getItem('users'))
  console.log("LogggedInUser",loggedInUser)
  console.log("UserLists",userLists);
  console.log("LogggedInUser Email: ",loggedInUser.email)
  
  //finds the user and get its value 
  let currentUser;
  userLists.forEach(user => {
    if(user.email === loggedInUser.email) {
        console.log("User Email",user.email)
        currentUser=user;
    }
    })
    //check current user
    console.log("Current User: ",currentUser)
    console.log("Current User Email: ",currentUser.email)

  /* set deposit (not confirmed state) */
  const [userBalance, setUserBalance] = React.useState(currentUser.balance);
  /* confirm deposit (submission state) */
  const [userCurrentData, setUserCurrentData] = React.useState(currentUser);
  /* set review deposit amount */
  const [reviewInputAmount, setReviewInputAmount] = React.useState(0);
  /* set state of submitConfirm button */
  const [isDisabled, setIsDisabled] = React.useState(true);

  const input = React.useRef(null);

  const enterDeposit = () => {
    const inputValue = parseInt(document.querySelector(`#deposit`).value);
    if (!inputValue || inputValue < 0) {
      setIsDisabled(true);
      disableButton("submitConfirm");
      setReviewInputAmount(0);
      console.log("enter deposit amount");
    } else {
      setIsDisabled(false);
      setReviewInputAmount(inputValue);
      setUserBalance(parseInt(currentUser.balance) + inputValue);
      enableButton("submitConfirm");
      console.log(userBalance);
      return inputValue;
    }
  }

  const confirmDeposit = () => {   
    /* setUserCurrentData((prevUserData) => {
      return { ...prevUserData, balance: 1000000000 };
    }); */
 
    console.log(userCurrentData);
  }
  
  const onClickSubmitEvent = () => {
    setIsDisabled(true);
    disableButton("submitConfirm");

    input.current.focus();
  }

  return (
    <>
      {<Transaction
        transactionType="deposit"
        currentBalance={userBalance}
        transactionProcess={enterDeposit}
        submitTransaction={confirmDeposit}
        inputValue={reviewInputAmount}
        userName={currentUser.name}
        userEmail={currentUser.email}
        isSubmitTransactionButtonDisabled={isDisabled}
        onClickSubmitEvent={onClickSubmitEvent}
        input={input}
  />}
    </>
  );
}

export default Deposit;