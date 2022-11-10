import React, { useEffect, useState } from 'react'
import Depo from '../components/ManageAccounts/Deposit'
import SelectAccount from '../components/ManageAccounts/SelectAccount'
import With from '../components/ManageAccounts/Withdraw'
import { demoUsers } from '../constants/demoUsers'

const Manage = () => {

//Load accounts from the localStorage
let loadAccounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
// UseState to store data
const [accounts, setMyAccounts] = useState(loadAccounts)
const [email, setEmail] = useState();
const [balance, setBalance] = useState([]);
const [input, setInput] = useState('');

//Auto update localStorage whenever the balance useState is changed
useEffect(() => {accounts.map(account => {if(email === account.email){
account.balance = balance}})
localStorage.setItem('accounts', JSON.stringify(accounts))
const reloadAccounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
setMyAccounts(reloadAccounts)
}, [balance])

//

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
            input={input}/>
</>
  )
}

export default Manage