import useProfile from "../hooks/useProfile"

const TargetAccount = ({accounts, setTargetEmail, targetEmail, setTargetBalance, targetBalance}) => {
    const {user}=useProfile()
    console.log("user role:",user.role)
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
        <div className='flex flex-col'>
            <select className="select w-full max-w-xs" onChange={targetAccountHandler}>
                <option>Select Account</option>
              {accounts.map((account, index) => { return(
                <option key={index} value={account.email} >{account.name}</option>
              )})}
            </select>
        </div>
      )
    }
    
    export default TargetAccount