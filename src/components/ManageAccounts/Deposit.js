import React, {useEffect } from 'react';
import { toast } from "react-toastify";

const Deposit = ({balance, setBalance, input, setInput, setHistory, history, user, email}) => {
console.log(email)
// save input value to a variable
const enteredAmount = input

// Timestamp 
const currentDate = Date.now(); // This would be the timestamp you want to format

const timeStamp = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
.format(currentDate);

const dateStamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', })
.format(currentDate)

const depositHandler = () => {
  if(input === '') {
    toast.error('Please enter an amount to proceed', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  else if(input === '0') {
    toast.error('Please enter an amount to proceed', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  else if(input > 500000) {
    toast.error('Maximum allowed deposit reached. Please enter an amount that is equal or lower than 500,000 pesos', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  else if(input < 500) {
    toast.error('Minimum allowed deposit reached. Please enter an amount that is equal or greater than 500 pesos', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  else {
    setBalance(balance + parseInt(input))
    setHistory([
      ...history,
      {createdby: `${user}`,
      date: `${dateStamp}`, 
      time:`${timeStamp}`, 
      type:'Deposit', 
      amount: `${enteredAmount}`, 
      sender: `${email}`, 
      receiver: `${email}`, 
      }
    ])
    toast.success('Deposit Successful', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}

const resetInput=(e)=> {depositHandler();setInput('')}

  return (
    <div><button className="btn btn-sm" onClick={resetInput}>deposit</button></div>
  )
}

export default Deposit;