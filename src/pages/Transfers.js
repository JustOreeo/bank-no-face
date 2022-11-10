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
const [input, setInput] = useState();

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
    setInput(e.target.value)
    console.log(input)
}

const transferHandler = ()=> {
    if(sourceEmail === targetEmail) {
        alert('Please select a different account')
    } else
    setSourceBalance(sourceBalance - parseInt(input))
    setTargetBalance(targetBalance + parseInt(input))
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
    <input type='text' onChange={e => inputHandler(e)}/>
    <button onClick={transferHandler}>Transfer</button>
    </div>
    </>
   
  )
}

export default Transfers