import React from "react";
import Transaction from "./SubComponents/Transaction";
import { useAuth } from "../Auth";
import {
  disableButton,
  enableButton,
} from "./SubComponents/InterfaceFunctions";

export default function Deposit() {
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

  function enterDeposit() {
    const inputValue = parseInt(document.querySelector(`#deposit`).value);
    if (!inputValue) {
      setIsDisabled(true);
      disableButton("submitConfirm");
      setReviewInputAmount(0);
      console.log("enter deposit amount");
    } else {
      setIsDisabled(false);
      setReviewInputAmount(inputValue);
      setUserBalance(parseInt(userData.balance) + inputValue);
      enableButton("submitConfirm");
      console.log(userBalance);
      return inputValue;
    }
  }

  function confirmDeposit() {
    /* setUserCurrentData((prevUserData) => {
      return { ...prevUserData, balance: 1000000000 };
    }); */
    console.log(userCurrentData);
  }

  function onClickSubmitEvent() {
    setIsDisabled(true);
    disableButton("submitConfirm");

    input.current.focus();
  }

  return (
    <>
      <Transaction
        transactionType="deposit"
        currentBalance={userBalance}
        transactionProcess={enterDeposit}
        submitTransaction={confirmDeposit}
        inputValue={reviewInputAmount}
        userName={userData.name}
        userEmail={userData.email}
        isSubmitTransactionButtonDisabled={isDisabled}
        onClickSubmitEvent={onClickSubmitEvent}
        input={input}
      />
    </>
  );
}
