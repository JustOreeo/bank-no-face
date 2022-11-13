import React from 'react'

const SourceAccount = ({accounts, setSourceEmail, sourceEmail, setSourceBalance, sourceBalance}) => {
  console.log("check account:",accounts)
  const targetAccountHandler = (e) => {   
        const targetUser = e.target.value
        console.log("target",targetUser)
        const filterAccount = accounts.filter((account => {
          if(account.email === targetUser){
            return targetUser;
        }}))
      console.log("Filter",filterAccount)
        const accountEmail = filterAccount[0].email
        const accountBalance = filterAccount[0].balance
        
        setSourceEmail(accountEmail)
        setSourceBalance(accountBalance)
       
    }
    
      return (
        <div>
             <select className="select w-full max-w-xs" onChange={targetAccountHandler}>
             <option>Select an account</option>
            {accounts.map((account, index) => { return(
                <option key={index} value={account.email} >{account.name}</option>
            )})}
            </select>
        </div>
      )
}

export default SourceAccount