import React from 'react'

const Deposit = ({balance, setBalance, input, setInput}) => {

const depositHandler = () => {
  if(input === ''){alert('Please enter an amount to proceed');}
  else if(input === '0'){alert('Please enter an amount to proceed');}
  else if(input > 500000){alert('Maximum allowed deposit reached. Please enter an amount that is equal or lower than 500,000 pesos')}
  else if(input < 500){alert('Minimum allowed deposit reached. Please enter an amount that is equal or greater than 500 pesos')}
  else{setBalance(balance + parseInt(input))}
}

const resetInput=(e)=> {depositHandler();setInput('')}

  return (
    <div><button className="btn btn-sm" onClick={resetInput}>deposit</button></div>
  )
}

export default Deposit;