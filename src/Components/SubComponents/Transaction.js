import React from "react";
import "../../assets/Transaction.css";

export default function Transaction(props) {
  return (
    <div className="transaction">
      <div className="transaction--header">
        <p className="user-info__name">
          Username Last Name{" "}
          <span className="account-switch">
            <i class="fa-solid fa-repeat"></i>
          </span>
        </p>
        <p className="user-email">user1@gmail.com</p>
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
          <input type="number" className="rounded-input" placeholder="1000" />
          <p>
            New Total Balance: &#8369;{" "}
            <span className="transaction-type__amount">1000</span>
          </p>
          <button className="green-button">Enter</button>
        </div>
        <div className="transaction--review">
          <p className="transaction-type__review">
            Review and{" "}
            <span className="transaction-type">{props.transactionType}</span>
          </p>
          {props.transactionType === "transfer" && (
            <p className="transaction-details">
              <span className="detail-type">From Account:</span>
              <span className="detail-data">User1 Lastname</span>
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
            <span className="detail-data">10-27-22</span>
            <span className="button-space-buffer"></span>
          </p>
          <p className="transaction-details">
            <span className="detail-type">Amount:</span>
            <span className="detail-data">&#8369; 200.00</span>
            <span className="button-space-buffer">edit</span>
          </p>
          <p className="transaction-details">
            <span className="detail-type">New Balance:</span>
            <span className="detail-data">&#8369; 200.00</span>
            <span className="button-space-buffer"></span>
          </p>
          <button className="green-button transaction-button">
            {props.transactionType}
          </button>
        </div>
      </div>
    </div>
  );
}
