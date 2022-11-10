import React from 'react'

const Withdraw = ({input, setBalance, balance, setInput}) => {

const withdrawHandler = () => {
  if(input === ''){alert('Please enter an amount to proceed');}
  else if(input === '0'){alert('Please enter an amount to proceed');}
  else if(input > 500000){alert('Maximum withdrawal amount reached. Please withdraw an amount that is equal or lower than 500,000 pesos');}
  else if(input < 500){alert('Minimum withdrawal amount reached. Please withdraw an amount that is equal or greater than 500 pesos');}
  else if(input > balance && balance !== 0 ){alert('Withdrawal amount is greater than the current balance');}
  else if(input > balance && balance === 0) {alert('Insufficient funds! Please deposit money on your account');}
  else {setBalance(balance - parseInt(input))}
} 

const resetInput=(e)=> {withdrawHandler();setInput('')}

  return (
    <div><button className="btn btn-sm" onClick={resetInput}>Withdrawal</button></div>
  )
}

export default Withdraw;