import React,{ useState, useEffect } from 'react'
import SourceAccount from './SourceAccount';
import TargetAccount from './TargetAccount';
const Transfers = () => {

    //Load accounts from the localStorage
    //check if user from local storage is not empty
    const storedAccounts=JSON.parse(localStorage.getItem("users"));
    let setAccounts="";
    if(storedAccounts){
        setAccounts=storedAccounts
    }
    //get all users except admin
    const getAccounts=[];
    setAccounts.forEach(user => {
    if(user.role!=="Admin"){
      getAccounts.push(user)
    }
    });
    console.log(getAccounts);

    //const accounts = Array.from(JSON.parse(localStorage.getItem('accounts')))
    let accounts = Array.from(getAccounts);

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
    const [sourceEmail, setSourceEmail] = useState();
    const [targetEmail, setTargetEmail] = useState();
    const [sourceBalance, setSourceBalance] = useState([]);
    const [targetBalance, setTargetBalance] = useState([])
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(loadHistory)
    const [user] = useState(getUser.email)

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
            if(sourceEmail === account.email)
            {
                account.balance = sourceBalance
            }
    })

    localStorage.setItem('users', JSON.stringify(storedAccounts))
    }, [sourceBalance])

    useEffect(() => {storedAccounts.map(account => {if(targetEmail === account.email){
        account.balance = targetBalance}})
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
        if (input === ''){alert('Please enter an amount to proceed')
        } else if (input < 500) {
            alert('Minimum transfer amount reached. Please enter an amount that is equal or greater than 500 pesos')
        } else if (input >500000) {
            alert('Maximum transfer amount reached. Please enter an amount that is equal or lower than 500000 pesos')
        } else if(sourceEmail === targetEmail && input > 500 && input < 500000){
            alert ("Source account is the same as the target account. Please select a different target account")
        }else{
            setSourceBalance(sourceBalance - parseInt(input))
            setTargetBalance(targetBalance + parseInt(input))
            setHistory([
                ...history,
                {createdby: `${user}`,
                date: `${dateStamp}`, 
                time:`${timeStamp}`, 
                type:'Transfer', 
                amount: `${enteredAmount}`, 
                sender: `${sourceEmail}`, 
                receiver: `${targetEmail}`, 
                }
            ])
        }
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
    <div className='pt-5 pb-5'>
        <input maxLength='6' placeholder='Amount' value={input} type='text' onChange={e => inputHandler(e)} className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'/>
    </div>
    <button className='green-button' onClick={transferHandler}>Transfer</button>
    </div>
    
    </>
   
  )
}

export default Transfers