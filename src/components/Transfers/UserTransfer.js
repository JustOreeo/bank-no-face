import React,{useState,useEffect,useRef} from 'react'

const UserTransfer = () => {
    const emailRef=useRef()
    const storedAccounts=JSON.parse(localStorage.getItem("users"));
    //const accounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
   
    let setAccounts="";
    if(storedAccounts){
        setAccounts=storedAccounts
    }
    let accounts = Array.from(setAccounts);
    //check if history from local storage is not empty
    const checkHistory=JSON.parse(localStorage.getItem("history"));
    let setUserHistory=[];
    if(checkHistory){
        setUserHistory=checkHistory
    }
    //const loadHistory = Array.from(JSON.parse(localStorage.getItem('history')))
    const loadHistory = Array.from(setUserHistory)
    let getUser = JSON.parse(localStorage.getItem('loggedInUser'))
      // UseState to store data
      const [sourceEmail] =useState(getUser.email)
      const [targetEmail, setTargetEmail] = useState();
      const [sourceBalance, setSourceBalance] = useState([]);
      const [targetBalance, setTargetBalance] = useState([])
      const [input, setInput] = useState('');
      const [newBalance, setNewBalance] = useState('');
      const [history, setHistory] = useState(loadHistory)
      const [user] = useState(getUser.email)
      const [error,setError]=useState('')
  
      // save input value to a variable
      const enteredAmount = input
  
      // Timestamp 
      const currentDate = Date.now(); // This would be the timestamp you want to format
  
      const timeStamp = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(currentDate);
  
      const dateStamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', })
      .format(currentDate)
  
      //Auto update localStorage whenever the balance useState is changed
      useEffect(() => {
          storedAccounts.map(account => {
            if(sourceEmail === account.email){
                account.balance = sourceBalance
            }
      })
  
      localStorage.setItem('users', JSON.stringify(storedAccounts))
      }, [sourceBalance])
  
      useEffect(() => {
        storedAccounts.map(account => {
            if(targetEmail === account.email){
            account.balance = targetBalance
            }})
        localStorage.setItem('users', JSON.stringify(storedAccounts))
      }, [targetBalance])
      
      useEffect(() => {
          localStorage.setItem('history', JSON.stringify(history))
          }, [history])
  
      //Capture Input
      const inputHandler = (e) => {
          const input = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
          setInput(input)
          
      }
      const transferHandler = (e)=> {
        setError("")
        const inputEmail=emailRef.current.value
        setTargetEmail(inputEmail) 
        if (input === ''){alert('Please enter an amount to proceed')
        } else if (input < 500) {
            alert('Minimum transfer amount reached. Please enter an amount that is equal or greater than 500 pesos')
        } else if (input >500000) {
            alert('Maximum transfer amount reached. Please enter an amount that is equal or lower than 500000 pesos')
        } else if(sourceEmail === targetEmail && input > 500 && input < 500000){
            alert ("Source account is the same as the target account. Please select a different target account")
        }else{
            //if user does not exists
            let found = false;
            //Checks if user exists
            storedAccounts.forEach((user) => {
            if (user.email === inputEmail) {
                console.log("User exists");
                found = true;
                return
            }
            });
            if(found==true){
                setError("")
                //source balance and target balance
                accounts.filter((account => {
                    if(account.email === sourceEmail){
                        setSourceBalance(account.balance)
                        console.log("Source balance",account.balance)
                    }
                    if(account.email === targetEmail){
                        setTargetBalance(account.balance)
                        console.log("Target balance",account.balance)
                    }
                }))
                setSourceBalance(sourceBalance - parseInt(input))
                setTargetBalance(targetBalance + parseInt(input))
                setHistory([
                ...history,
                {createdby: `${user}`,
                date: `${dateStamp}`, 
                time:`${timeStamp}`, 
                type:'Transfer', 
                amount: `${enteredAmount}`, 
                sender: `${user}`, 
                receiver: `${targetEmail}`, 
                }
            ])
            }else{
                setError("User does not exists")
            }
            
          }
      }
      console.log(`This is the source ${sourceEmail}`)
      console.log(`This is the source balance ${sourceBalance}`)
  
  
      console.log(`This is the target ${targetEmail}`)
      console.log(`This is the target ${targetBalance}`)
    return (
        <>
        <div>
            <h2 className="component-header">Transfer</h2>
            <div className='flex flex-col border-solid border-2 '>
                <input placeholder='Transfer to' ref={emailRef} type='text' className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'/>
                <div className='pt-5 pb-5'>
                    <input maxLength='6' placeholder='Amount' value={input} type='text' onChange={e => inputHandler(e)} className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'/>
                </div>
                <div>{error}</div>
                <div>{newBalance}</div>
                <button className='green-button' onClick={transferHandler}>Transfer</button>
            </div>
        </div>
        </>
    )
}

export default UserTransfer