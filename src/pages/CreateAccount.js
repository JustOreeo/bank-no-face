import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { createAccountFields } from "../constants/formFields";
import "../assets/Register.css";
import Dialog from "../components/common/Dialog";
import { toast } from "react-toastify";
const fields = createAccountFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
console.log("Fields: ", fields);

const CreateAccount = () => {
  const [dialogue, setDialogue] = useState({
    message: "",
    isLoading: false,
  });
  const handleDialog = (message, isLoading) => {
    setDialogue({ message, isLoading });
  };

  const navigate = useNavigate();
  const [createAccountState, setCreateAccountState] = useState(fieldsState);
  const userHistory = JSON.parse(localStorage.getItem("users"));

  // Automatically handle the input state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAccountState({ ...createAccountState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleDialog("create?", true);
  };

  const createConfirmation = (transferChoice) => {
    if (transferChoice) {
      let found = false;
      console.log("History", userHistory);
      console.log("State", createAccountState);
      console.log("State Email", createAccountState.email);

      //Checks if user already exists
      userHistory.forEach((user) => {
        if (user.email === createAccountState.email) {
          console.log("user exists");
          found = true;
          return;
        }
      });
      if(createAccountState.name===''||createAccountState.email===''||createAccountState.password===''||createAccountState.balance===''){
        toast.error('Please enter to all fields to proceed', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else if(found){
        toast.error('User Already Exists', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else if(createAccountState.balance<0){
        toast.error('Balance cannot be negative', {
          position: toast.POSITION.TOP_RIGHT
      });
      }
      else{
        if (!found) {
          //make balance into integer
          createAccountState.balance = parseInt(createAccountState.balance);
          createAccountState.role = "User";
          createAccountState.dateCreated = new Date().toLocaleDateString();
          userHistory.push(createAccountState);
          localStorage.setItem("users", JSON.stringify(userHistory));
          toast.success('User Acccount Created Successfully', {
            position: toast.POSITION.TOP_RIGHT
          });
          navigate("/users");
        } 
      }
     
      handleDialog("", false);
    } else {
      handleDialog("", false);
      return;
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
      </div>
      {dialogue.isLoading && (
        <Dialog onDialog={createConfirmation} message={dialogue.message} />
      )}
    </>
  );
};

export default CreateAccount;
