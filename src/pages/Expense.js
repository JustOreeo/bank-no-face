import React, {useState, useEffect} from 'react'

//Import Components
import AddExpense from '../components/Expenses/CreateExpense';
import ExpenseTable from '../components/Expenses/ExpenseTable';
import useProfile from '../components/hooks/useProfile';
// getting the values of local storage
const getDatafromLS = () => {
    
    const data = localStorage.getItem('expenses');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
}
  
const Expense = () => {
  const {user} = useProfile();
  console.log("expense:",user)
   // main array of objects state || expense state || expense array of objects
  const [expenses, setExpenses]=useState(getDatafromLS());
  const [totalExpense,setTotalExpense]=useState('')
  console.log("table expense:",user)


  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses])

  return (
      <div>
          <div>Balance: {user.balance}</div>
          <AddExpense expenses={expenses} setExpenses={setExpenses}/>
          <ExpenseTable expenses={expenses} setExpenses={setExpenses}/> 
      </div>
  )
}

export default Expense;
