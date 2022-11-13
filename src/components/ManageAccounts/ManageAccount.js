import React from 'react'
import Deposit from './Deposit';

import Withdraw from './Withdraw';


const ManageAccount = ({id, setEmail, setBalance, accounts, email, balance, setInput, input, history, setHistory, user}) => {


const inputHandler = (e) => { 
    //Capture input and allow numbers only
        const input = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
        setInput(input)
}

// Select the account and filter the localStorage DB

const targetHandler = (e) => {
    const targetUser = e.target.id
    const filterAccount = accounts.filter((account => account.email === targetUser))
    
    const accountEmail = filterAccount[0].email
    const accountBalance = filterAccount[0].balance
    
    setEmail(accountEmail)
    setBalance(accountBalance)
}

// Format Number

const getCurrentBalance = parseInt(balance)
const formatNumber=  getCurrentBalance.toLocaleString(undefined, {maximumFractionDigits: 2})


return (
    <>
        <label htmlFor="my-modal-3" className="underline cursor-pointer	" onClick={targetHandler} id={id}>Manage</label>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
    
        <div className="modal">
            <div className="modal-box relative h-screen w-screen">
            <label htmlFor="my-modal-3" className="absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Manage Account: {email}</h3>
            <div className="stats bg-primary text-primary-content">
                <div className="stat w-96">
                    <div className="stat-title">Account balance</div>
                    <div className="stat-value">&#8369; {formatNumber}</div>
                </div>
            </div>

            <div className="divider"></div>
            <input maxLength='6' value={input} onChange={e => inputHandler(e)}type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <div className='flex flex-row justify-between'>
            <Withdraw balance={balance} setBalance={setBalance} input={input} setInput={setInput} history={history} setHistory={setHistory} user={user} email={email}/>
            <Deposit balance={balance} setBalance={setBalance} input={input} setInput={setInput} history={history} setHistory={setHistory} user={user} email={email}/>
            </div>
            <div className='divider'></div>
            <div className='flex flex-col'>
            <small>*Minimum withdrawal and deposit amount is &#8369;500 </small>
            <small>**Maximum withdrawal and deposit amount is &#8369;500,000 </small>
            </div>
    </div>
    </div>
    </>

  )
}

export default ManageAccount;