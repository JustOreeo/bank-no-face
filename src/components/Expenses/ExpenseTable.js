import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import useProfile from '../hooks/useProfile';
const ExpenseTable = ({expenses,setExpenses}) => {
    const {user} = useProfile();
    const [totalExpense,setTotalExpense]=useState('')
    const expenseHistory= JSON.parse(localStorage.getItem('expenses'))
    console.log("table expense:",user)

    
    const showToastMessage = (isSuccess) => {
        if(isSuccess === true) {
            toast.success('Expense Deleted Successfully!', {
              position: toast.POSITION.TOP_RIGHT
          });
        } 
    };
    
    //map only expenses of current user
    let userExpenses=[];
    let total=0;
    expenseHistory.map((expense)=>{
        if(expense.email===user.email){
            userExpenses.push(expense)
            total+=expense.amount
        }
    })
    useEffect(()=>{
        setTotalExpense(total)
      },[])
    console.log("Total Expense",total)
    // delete expense
    const deleteExpenses=(id)=>{
        const filteredExpenses=expenses.filter((element,index)=>{
            return element.id !== id
        })
        setExpenses(filteredExpenses);
        localStorage.setItem('expenses',JSON.stringify(filteredExpenses));
        showToastMessage(true)
    }
    
    return (
        <>
            <div className='overflow-x-auto pt-5 w-full'>
                <div>Total Expense: {totalExpense}</div>
                {expenseHistory.length>0&&
                    <>
                    <div className=''>
                        <table className='table w-full border text-center'>
                        <thead >
                        <tr>
                            <th></th>
                            <th>Expense</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {expenseHistory.map((expense,index)=>(
                            <tr key={index}>
                                <th>{index+1}</th>
                                <td>{expense.expenseName}</td>
                                <td>{expense.category}</td>
                                <td>{expense.amount}</td>
                                <td onClick={()=>deleteExpenses(expense.id)}>
                                <i className='fa-solid fa-trash'/>
                                </td>           
                            </tr>            
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
                    </>
                }
                {expenseHistory.length < 1 && 
                    <div>No expenses are added yet</div>
                }
            </div>
        </>
    )
}

export default ExpenseTable;
