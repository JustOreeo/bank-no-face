
const TargetAccount = ({accounts, setTargetEmail, targetEmail, setTargetBalance, targetBalance}) => {

    // Select the account and filter the localStorage DB
    const targetAccountHandler = (e) => {   
        const targetUser = e.target.value
        const filterAccount = accounts.filter((account => account.email === targetUser))
    
        const accountEmail = filterAccount[0].email
        const accountBalance = filterAccount[0].balance
    
        setTargetEmail(accountEmail)
        setTargetBalance(accountBalance)
   
    }
    
      return (
        <div>
             <select className="select w-full max-w-xs" onChange={targetAccountHandler}>
             <option value='null'>Select an account</option>
            {accounts.map((account, index) => { return(
                <option key={index} value={account.value} >{account.name}</option>
            )})}
            </select>
        </div>
      )
    }
    
    export default TargetAccount