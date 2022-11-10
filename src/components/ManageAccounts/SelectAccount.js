import React, {useEffect, useState} from 'react'
import ManageAccount from './ManageAccount'

const SelectAccount = ({accounts, setEmail, setBalance, email, balance, setInput, input}) => {

  return (
    <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    <thead>
      <tr>
        <th></th> 
        <th>Name</th> 
        <th>Email</th> 
        <th>Role</th>
        <th>Balance</th> 
        <th>Manage</th> 
      </tr>
    </thead> 
    <tbody>
      {accounts.map((account, index) => {return (
      <tr key={index} >
        <th >{index}</th> 
        <td>{account.name}</td> 
        <td>{account.email}</td>
        <td>{account.role}</td>
        <td>&#8369;{account.balance.toLocaleString(undefined, {maximumFractionDigits: 2})}</td> 
        <td><ManageAccount 
          id={account.email} 
          setEmail={setEmail}
          email={email} 
          setBalance={setBalance} 
          balance={balance}
          setInput={setInput}
          input={input}
          accounts={accounts}/>
        </td> 
      </tr>
      )})}
      
    </tbody> 
  </table>
</div>
  )
}

export default SelectAccount