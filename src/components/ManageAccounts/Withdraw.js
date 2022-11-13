import React,  {useEffect} from 'react'

const Withdraw = ({input, setBalance, balance, setInput, setHistory, history, user, email}) => {

// save input value to a variable
    const enteredAmount = input

// Timestamp 
const currentDate = Date.now(); // This would be the timestamp you want to format

const timeStamp = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
.format(currentDate);

const dateStamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', })
.format(currentDate)

useEffect(() => {
  localStorage.setItem('history', JSON.stringify(history))
  }, [history])
  
const withdrawHandler = () => {
  if(input === ''){alert('Please enter an amount to proceed');}
  else if(input === '0'){alert('Please enter an amount to proceed');}
  else if(input > 500000){alert('Maximum withdrawal amount reached. Please withdraw an amount that is equal or lower than 500,000 pesos');}
  else if(input < 500){alert('Minimum withdrawal amount reached. Please withdraw an amount that is equal or greater than 500 pesos');}
  else if(input > balance && balance !== 0 ){alert('Withdrawal amount is greater than the current balance');}
  else if(input > balance && balance === 0) {alert('Insufficient funds! Please deposit money on your account');}
  else {
    setBalance(balance - parseInt(input))
    setHistory([
            ...history,
            {createdby: `${user}`,
             date: `${dateStamp}`, 
             time:`${timeStamp}`, 
             type:'Withdraw', 
             amount: `${enteredAmount}`, 
             sender: `${email}`, 
              receiver: `${email}`, 
        }
        ])
  }
} 

const resetInput=(e)=> {withdrawHandler();setInput('')}

  return (
    <div><button className="btn btn-sm" onClick={resetInput}>Withdrawal</button></div>
  )
}

export default Withdraw;