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
  const expenseHistory= JSON.parse(localStorage.getItem('expenses'))

  // saving data to local storage
  useEffect(()=>{
    if (expenseHistory === null) {
      localStorage.setItem("expenses", JSON.stringify([]));
    }else{
      localStorage.setItem('expenses',JSON.stringify(expenses));
    }
  },[expenses])

  return (
      <div>
          <h2 className="component-header">Budget</h2>
          <div className='pt-5'>
            <label for="my-modal-3" class="btn btn-sm border-none bg-primary rounded-xl normal-case">Add Expense</label>
          </div>
          <input type="checkbox" id="my-modal-3" class="modal-toggle" />
          <label for="my-modal-3" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
              <label for="my-modal-3" class="absolute right-2 top-2">
                <i class="fa-solid fa-circle-xmark"></i>
              </label>
              <AddExpense expenses={expenses} setExpenses={setExpenses}/>
            </label>
          </label>
          
          <ExpenseTable expenses={expenses} setExpenses={setExpenses}/> 
      </div>
  )
}

export default Expense;