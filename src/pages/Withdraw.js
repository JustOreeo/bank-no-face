import React from "react";
import Transaction from "../components/common/Transaction";
import {
  disableButton,
  enableButton,
} from "../components/common/InterfaceFunctions";

const Withdraw = () => {
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

  const onClickSubmitEvent = () => {
    setIsDisabled(true);
    disableButton("submitConfirm");

    input.current.focus();
  }

  const enterWithdraw = () => {
    const inputValue = parseInt(document.querySelector(`#withdraw`).value);
    if (!inputValue || inputValue < 0) {
      setIsDisabled(true);
      disableButton("submitConfirm");
      setReviewInputAmount(0);
      console.log("enter withdraw amount");
    } else if (inputValue > currentUser.balance) {
      setIsDisabled(true);
      disableButton("submitConfirm");
      console.log("negatib pre");
    } else {
      setIsDisabled(false);
      enableButton("submitConfirm");
      setReviewInputAmount(inputValue);
      setUserBalance(parseInt(currentUser.balance) - inputValue);
      console.log(userBalance);
      return inputValue;
    }
  }

  const confirmWithdraw = () => {
    /* setUserCurrentData((prevUserData) => {
      return { ...prevUserData, balance: 10000000 };
    }); */
    console.log(userCurrentData);
  }

  return (
    <Transaction
      transactionType="withdraw"
      currentBalance={userBalance}
      transactionProcess={enterWithdraw}
      submitTransaction={confirmWithdraw}
      inputValue={reviewInputAmount}
      userName={currentUser.name}
      userEmail={currentUser.email}
      isSubmitTransactionButtonDisabled={isDisabled}
      onClickSubmitEvent={onClickSubmitEvent}
      input={input}
    />
  );
}

export default Withdraw;