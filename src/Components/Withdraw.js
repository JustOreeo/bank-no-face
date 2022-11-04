import React from "react";
import Transaction from "./SubComponents/Transaction";
import { useAuth } from "../Auth";
import {
  disableButton,
  enableButton,
} from "./SubComponents/InterfaceFunctions";

export default function Withdraw() {
  const auth = useAuth();
  const userData = auth.user;

  /* set deposit (not confirmed state) */
  const [userBalance, setUserBalance] = React.useState(userData.balance);
  /* confirm deposit (submission state) */
  const [userCurrentData, setUserCurrentData] = React.useState(userData);
  /* set review deposit amount */
  const [reviewInputAmount, setReviewInputAmount] = React.useState(0);
  /* set state of submitConfirm button */
  const [isDisabled, setIsDisabled] = React.useState(true);

  const input = React.useRef(null);

  function onClickSubmitEvent() {
    setIsDisabled(true);
    disableButton("submitConfirm");

    input.current.focus();
  }

  function enterWithdraw() {
    const inputValue = parseInt(document.querySelector(`#withdraw`).value);
    if (!inputValue || inputValue < 0) {
      setIsDisabled(true);
      disableButton("submitConfirm");
      setReviewInputAmount(0);
      console.log("enter withdraw amount");
    } else if (inputValue > userData.balance) {
      setIsDisabled(true);
      disableButton("submitConfirm");
      console.log("negatib pre");
    } else {
      setIsDisabled(false);
      enableButton("submitConfirm");
      setReviewInputAmount(inputValue);
      setUserBalance(parseInt(userData.balance) - inputValue);
      console.log(userBalance);
      return inputValue;
    }
  }

  function confirmWithdraw() {
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
      userName={userData.name}
      userEmail={userData.email}
      isSubmitTransactionButtonDisabled={isDisabled}
      onClickSubmitEvent={onClickSubmitEvent}
      input={input}
    />
  );
}
