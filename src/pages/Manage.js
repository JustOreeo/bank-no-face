import React, { useEffect, useState } from 'react'
import Depo from '../components/ManageAccounts/Deposit'
import SelectAccount from '../components/ManageAccounts/SelectAccount'
import With from '../components/ManageAccounts/Withdraw'
import { demoUsers } from '../constants/demoUsers'

const Manage = () => {

//Load accounts from the localStorage
const loadAccounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
const getUser = JSON.parse(localStorage.getItem('loggedInUser'))
const loadHistory = Array.from(JSON.parse(localStorage.getItem('history')))

// UseState to store data

const [user] = useState(getUser.email)
const [accounts, setMyAccounts] = useState(loadAccounts)
const [email, setEmail] = useState();
const [balance, setBalance] = useState([]);
const [input, setInput] = useState('');
const [history, setHistory] = useState(loadHistory);


//Auto update localStorage whenever the balance useState is changed
useEffect(() => {accounts.map(account => {if(email === account.email){
account.balance = balance}})
localStorage.setItem('accounts', JSON.stringify(accounts))
const reloadAccounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
setMyAccounts(reloadAccounts)
}, [balance])

useEffect(() => {
  localStorage.setItem('history', JSON.stringify(history))
  }, [history])
  

return (
    <>
      <h1 className='mb-2'>Manage Accounts</h1>
        <SelectAccount 
            accounts={accounts}
            setEmail={setEmail}
            email={email}
            setBalance={setBalance}
            balance={balance}
            setInput={setInput}
            history={history}
            setHistory={setHistory}
            user={user}
            input={input}/>
</>

  )
}

export default Manage