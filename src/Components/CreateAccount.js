import React from "react";
import "../assets/Register.css";
export default function CreateAccount() {
  return (
    <div className="register">
      <label className="sr-only" htmlFor="">
        Name
      </label>
      <input className="rounded-input" type="text" placeholder="name" />
      <label className="sr-only" htmlFor="">
        Email
      </label>
      <input className="rounded-input" type="email" placeholder="email" />
      <label className="sr-only" htmlFor="">
        Password
      </label>
      <input className="rounded-input" type="password" placeholder="password" />
      <label className="sr-only" htmlFor="">
        Initial Balance
      </label>
      <input
        className="rounded-input"
        type="text"
        placeholder="initial balance"
      />
      <span className="errorMsg"></span>
      <button className="green-button" id="createUser">
        create a new user
      </button>
    </div>
  );
}
