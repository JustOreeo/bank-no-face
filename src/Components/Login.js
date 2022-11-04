import "../assets/Login.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
export default function Login({ Userlist }) {
  const emailRef = useRef();
  const passRef = useRef();
  let email;
  let password;
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loginError, setLoginError] = useState("");
  //for auth
  const auth = useAuth();
  const userData = auth.user;
  const navigate = useNavigate();
  //redirect if logged in already
  if (userData.isLoggedIn) {
    if (userData.accountType === "admin") {
      navigate("/dashboard/admin");
    }
    if (userData.accountType === "user") {
      navigate("/dashboard/account");
    }
  }

  //Functions for Login Validations
  function handleEmail() {
    email = emailRef.current.value;

    if (email === "") {
      setEmailError("Email is required");
      emailRef.current.classList.add("error");
    } else {
      setEmailError("");
      emailRef.current.classList.remove("error");
    }
    setLoginError("");
  }
  function handlePass() {
    password = passRef.current.value;

    if (password === "") {
      setPassError("Password is required");
      passRef.current.classList.add("error");
    } else {
      setPassError("");
      passRef.current.classList.remove("error");
    }
    setLoginError("");
  }
  function handleLogin(e) {
    e.preventDefault();

    email = emailRef.current.value;
    password = passRef.current.value;
    let account;
    if (email === "") {
      setEmailError("Email is required");
      emailRef.current.classList.add("error");
    }
    if (password === "") {
      setPassError("Password is required");
      passRef.current.classList.add("error");
    }
    if (email !== "" && password !== "") {
      account = Userlist.find((users) => users.email === email);
      console.log(account);
      if (account && email === account.email && password === account.password) {
        setLoginError("Success");
        auth.login(account);
      } else {
        setLoginError("Invalid email/password");
        passRef.current.classList.remove("error");
        emailRef.current.classList.remove("error");
      }
    }
  }
  function addUser() {
    const storedUsers = JSON.parse(localStorage.getItem("storedUsers"));
    console.log("storedusers");
    console.log(storedUsers);
    if (storedUsers) {
      storedUsers.push({
        id: 2,
        name: "Test User",
        email: "user@gmail.com",
        password: "01234567",
        accountType: "user",
        balance: 0,
      });
      localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
    }
  }
  function delUser() {
    window.localStorage.removeItem("storedUsers");
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="container" noValidate>
        <input
          type="email"
          ref={emailRef}
          value="admin@gmail.com"
          placeholder="Email"
          className="input"
          onChange={handleEmail}
        />
        <span className="errorMsg">{emailError}</span>
        <input
          type="password"
          ref={passRef}
          value="01234567"
          placeholder="Password"
          className="input"
          onChange={handlePass}
        />
        <span className="errorMsg">{passError}</span>
        <span className="errorMsg">{loginError}</span>
        <button type="submit" className="btn">
          Login
        </button>
        <br></br>
      </form>
      <button onClick={addUser}>Add one user for testing</button>
      <br></br>
      <button onClick={delUser}>Delete storedUsers</button>
      <br></br>
    </div>
  );
}
