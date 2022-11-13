import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { createAccountFields } from "../constants/formFields";
import "../assets/Register.css";

const fields = createAccountFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
console.log("Fields: ", fields);

const CreateAccount = () => {
  const navigate = useNavigate();
  const [createAccountState, setCreateAccountState] = useState(fieldsState);
  const userHistory = JSON.parse(localStorage.getItem("users"));
  const [createAccError, setCreateAccError] = useState("");
  //can't be null because of admin user
  /*if (userHistory === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }*/

  // Automatically handle the input state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAccountState({ ...createAccountState, [name]: value });
  };

  const handleSubmit = () => {
    let found = false;
    console.log("History", userHistory);
    console.log("State", createAccountState);
    console.log("State Email", createAccountState.email);

    //Checks if user already exists
    userHistory.forEach((user) => {
      if (user.email === createAccountState.email) {
        console.log("user exists");
        setCreateAccError("User Already Exists");
        found = true;
      }
    });

    if (!found) {
      setCreateAccError("");
      //make balance into integer
      createAccountState.balance = parseInt(createAccountState.balance);
      createAccountState.role = "User";
      userHistory.push(createAccountState);
      localStorage.setItem("users", JSON.stringify(userHistory));
      navigate("/users");
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="component-header">Accounts</h1>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="py-10">
            {fields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={createAccountState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>
          <Button handleSubmit={handleSubmit} text="Create Account" />
        </form>
        <span className="errorMsg">{createAccError}</span>
      </div>
    </>
  );
};

export default CreateAccount;
