import React from "react";
import "../../assets/Transaction.css";
import { disableButton } from "../common/InterfaceFunctions";

const Transaction = (props) => {
  /* set current date */
  const date = new Date();
  const dateToday = date.toLocaleDateString();

  return (
    <div className="transaction">
      <div className="transaction--header">
        <p className="user-info__name">
          {props.userName}
          <span className="account-switch">
            <i className="fa-solid fa-repeat"></i>
          </span>
        </p>
        <p className="user-email">{props.userEmail}</p>
      </div>
      <div className="transaction--body">
        <div className="transaction--form">
          <p className="transaction-type">{props.transactionType}</p>
          {props.transactionType === "transfer" && (
            <input
              type="text"
              className="rounded-input"
              placeholder="user2@gmail.com"
            />
          )}
          <input
            type="number"
            className="rounded-input"
            placeholder="1000"
            id={props.transactionType}
            ref={props.input}
          />
          <p>
            New Total Balance: &#8369;
            <span className="transaction-type__amount">
              {props.currentBalance}
            </span>
          </p>
          <button onClick={props.transactionProcess} className="green-button">
            Enter
          </button>
        </div>
        <div
          className="transaction--review"
          style={{
            display: props.isSubmitTransactionButtonDisabled ? "none" : "block",
          }}
        >
          <p className="transaction-type__review">
            Review and{" "}
            <span className="transaction-type">{props.transactionType}</span>
          </p>
          {props.transactionType === "transfer" && (
            <p className="transaction-details">
              <span className="detail-type">From Account:</span>
              <span className="detail-data">{props.userName}</span>
              <span className="button-space-buffer"></span>
            </p>
          )}

          {props.transactionType === "transfer" && (
            <p className="transaction-details">
              <span className="detail-type">To Account:</span>
              <span className="detail-data">User2 Lastname</span>
              <span className="button-space-buffer"></span>
            </p>
          )}

          <p className="transaction-details">
            <span className="detail-type">Date:</span>
            <span className="detail-data">{dateToday}</span>
            <span className="button-space-buffer"></span>
          </p>
          <p className="transaction-details">
            <span className="detail-type">Amount:</span>
            <span className="detail-data">
              &#8369; {props.inputValue ? props.inputValue : 0}
            </span>
            <span
              onClick={props.onClickSubmitEvent}
              className="edit button-space-buffer"
            >
              edit
            </span>
          </p>
          <p className="transaction-details">
            <span className="detail-type">New Balance:</span>
            <span className="detail-data">&#8369; {props.currentBalance}</span>
            <span className="button-space-buffer"></span>
          </p>
          <button
            id="submitConfirm"
            className="green-button transaction-button disable"
            onClick={
              props.isSubmitTransactionButtonDisabled
                ? null
                : props.submitTransaction
            }
          >
            {props.transactionType}
          </button>
        </div>
      </div>
    </div>
  );
}

// export default Transaction;
