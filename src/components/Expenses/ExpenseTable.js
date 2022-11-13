import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExpenseTable = ({expenses,setExpenses}) => {
    // delete expense
    const deleteExpenses=(amount)=>{
        const filteredExpenses=expenses.filter((element,index)=>{
            return element.amount !== amount
        })
        setExpenses(filteredExpenses);
    }

    return (
        <>
            <div className='overflow-x-auto pt-5 w-full'>
                {expenses.length>0&&
                    <>
                    <div className=''>
                        <table className='table w-full border text-center'>
                        <thead >
                        <tr>
                            <th className='bg-slate-800 text-white'></th>
                            <th className='bg-slate-800 text-white'>Expense</th>
                            <th className='bg-slate-800 text-white'>Category</th>
                            <th className='bg-slate-800 text-white'>Amount</th>
                            <th className='bg-slate-800 text-white'>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense,index)=>(
                            <tr key={index}>
                                <th>{index+1}</th>
                                <td>{expense.expenseName}</td>
                                <td>{expense.category}</td>
                                <td>{expense.amount}</td>
                                <td className='delete-btn' onClick={()=>deleteExpenses(expense.amount)}>
                                <FontAwesomeIcon icon="fa-solid fa-trash"/>
                                </td>           
                            </tr>            
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
                    <div className='pt-5 flex justify-center'>
                    <button className='btn btn-sm border-none bg-primary rounded-xl normal-case'
                    onClick={()=>setExpenses([])}>Remove All</button> 
                    </div>
                    </>
                }
                {expenses.length < 1 && 
                    <div>No expenses are added yet</div>
                }
            </div>
        </>
    )
}

export default ExpenseTable;
