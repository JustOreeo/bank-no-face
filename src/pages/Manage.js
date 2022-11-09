import React, { useEffect, useState } from 'react'
import Depo from '../components/ManageAccounts/Depo'
import SelectAccount from '../components/ManageAccounts/SelectAccount'
import With from '../components/ManageAccounts/With'
import { demoUsers } from '../constants/demoUsers'

const Manage = () => {

//Load accounts from the localStorage
const accounts = Array.from(JSON.parse(localStorage.getItem('accounts')))

// UseState to store data
const [email, setEmail] = useState();
const [balance, setBalance] = useState([]);
const [input, setInput] = useState();

//Auto update localStorage whenever the balance useState is changed
useEffect(() => {accounts.map(account => {if(email === account.email){
account.balance = balance}})
localStorage.setItem('accounts', JSON.stringify(accounts))
}, [balance])



//Capture Input
const inputHandler = (e) => {
    setInput(e.target.value)
}




return (
    <>
      <h1 className='mb-2'>Manage Accounts</h1>
        <SelectAccount setEmail={setEmail} setBalance={setBalance} accounts={accounts}/>
   
        <div className="mt-4">
            <div className="stats">
                <div className="stat">
                        <div className="stat-title">Account balance</div>
                        <div className="stat-value">${balance}</div>
                </div>
                <div className='p-4'>
                    <input onChange={e => inputHandler(e)} type="text" placeholder="Type here" className="input w-full max-w-xs p-2" />
                    <div className="flex flex-row">
                        <With 
                            setBalance={setBalance}
                            balance={balance}
                            input={input}
                            accounts={accounts}
                            email={email}
                            />
                        <Depo 
                            setBalance={setBalance}
                            balance={balance}
                            input={input}
                            />
                    </div>
                </div>
            </div>
        </div>
</>
  )
}

export default Manage