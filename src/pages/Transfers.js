import React,{ useState, useEffect } from 'react'
import SelectAccount from '../components/ManageAccounts/SelectAccount';
import SourceAccount from '../components/Transfers/SourceAccount';
import TargetAccount from '../components/Transfers/TargetAccount';

const Transfers = () => {

//Load accounts from the localStorage
const accounts = Array.from(JSON.parse(localStorage.getItem('accounts')))

// UseState to store data
const [sourceEmail, setSourceEmail] = useState();
const [targetEmail, setTargetEmail] = useState();
const [sourceBalance, setSourceBalance] = useState([]);
const [targetBalance, setTargetBalance] = useState([])
const [input, setInput] = useState('');

//Auto update localStorage whenever the balance useState is changed
useEffect(() => {accounts.map(account => {if(sourceEmail === account.email){
account.balance = sourceBalance}})
localStorage.setItem('accounts', JSON.stringify(accounts))
}, [sourceBalance])

useEffect(() => {accounts.map(account => {if(targetEmail === account.email){
    account.balance = targetBalance}})
    localStorage.setItem('accounts', JSON.stringify(accounts))
}, [targetBalance])
    



//Capture Input
const inputHandler = (e) => {
    const input = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    setInput(input)
    
}

const transferHandler = (e)=> {
    if (input === ''){alert('Please enter an amount to proceed')
    } else if (input < 500) {
        alert('Minimum transfer amount reached. Please enter an amount that is equal or greater than 500 pesos')
    } else if (input >500000) {
        alert('Maximum transfer amount reached. Please enter an amount that is equal or lower than 500000 pesos')
    } else if(sourceEmail === targetEmail && input > 500 && input < 500000){
        alert ("Source account is the same as the target account. Please select a different target account")
    }else{
        setSourceBalance(sourceBalance - parseInt(input))
        setTargetBalance(targetBalance + parseInt(input))
    }
       
    
    
}


console.log(`This is the source ${sourceEmail}`)
console.log(`This is the source balance ${sourceBalance}`)


console.log(`This is the target ${targetEmail}`)
console.log(`This is the target ${targetBalance}`)
  return (
    <>
    <h1>Source Account</h1>
    <SourceAccount 
        accounts={accounts}
        sourceEmail={sourceEmail}
        setSourceEmail={setSourceEmail}
        setSourceBalance={setSourceBalance}
        sourceBalance={sourceBalance}/>
    <div>{sourceEmail}</div>
    <div>{sourceBalance}</div>
    <div className="divider"></div>
    <h1>Target Account</h1>
    <TargetAccount 
        accounts={accounts}
        targetEmail={targetEmail}
        setTargetEmail={setTargetEmail}
        setTargetBalance={setTargetBalance}
        targetBalance={targetBalance}/>
    <div>{targetEmail}</div>
    <div>{targetBalance}</div>
    <div className='flex flex-col border-solid border-2 '>
    <input maxLength='6' value={input} type='text' onChange={e => inputHandler(e)}/>
    <button onClick={transferHandler}>Transfer</button>
    </div>
    </>
   
  )
}

export default Transfers