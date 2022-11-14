/* eslint-disable no-restricted-globals */
import React, { useState,useEffect } from 'react';
import { toast } from "react-toastify";
import useProfile from '../hooks/useProfile';
import uuid from 'react-uuid';
const AddExpense = ({expenses, setExpenses,userInfo}) => {
    const {user} = useProfile();
    console.log("addexpense: ",user.email)   
    // input field states
    console.log("asan ka user: ",userInfo)
    const [expenseName, setExpenseName]=useState('');
    const [category, setCategory]=useState('');
    const [amount, setAmount]=useState('');
    const expenseHistory= JSON.parse(localStorage.getItem('expenses'))

    const showToastMessage = (isSuccess) => {
        if(isSuccess === true) {
          toast.success('Expense Added Successfully!', {
              position: toast.POSITION.TOP_RIGHT
          });
        } else {
          toast.error('Please complete all fields!', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
    };
    //Get Total Expense
    let total=0;
    expenseHistory.map((expense)=>{
        if(expense.email===user.email){
            total+=expense.amount
            console.log("check user email:")
        }
    })
    // form submit event
    const handleAddExpenseSubmit = async (e) => {
        e.preventDefault();
        // creating an object
        let expense={
            expenseName,
            category,
            amount
        }
        //add user email
        expense.id=uuid()
        expense.email=user.email
        expense.amount=parseInt(expense.amount)
        if (!expenseName || !category || !amount) {
            showToastMessage(false);
            return
        }
        await setExpenses([...expenses,expense]);
        showToastMessage(true)
        setExpenseName('');
        setCategory('');
        setAmount('');
        
         
    }
 
    console.log("Total Expense",total)
    return (
        <div className=''>
            <div className=''>
            <div className=''>
                <form autoComplete="off" className='' onSubmit={handleAddExpenseSubmit}>
                <div className='mb-3 xl:w-96'>
                    <label className='text-xs'>Expense Name</label>
                    <input type="text" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                    onChange={(e)=>setExpenseName(e.target.value)} value={expenseName}></input>
                </div>
                <div className='mb-3 xl:w-96'>
                    <select 
                        onChange={(e)=>setCategory(e.target.value)} 
                        value={category}
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                    >     
                        <option>Category</option>
                        <option>Savings</option>
                        <option>Travel</option>
                        <option>Food</option>
                        <option>Leisure</option>
                        <option>Housing</option>
                        <option>Pet</option>
                        <option>Insurance</option>    
                    </select>
                </div>
                <div className='mb-3 xl:w-96'>
                    <input type="number" placeholder='Amount' className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                    onChange={(e)=>setAmount(e.target.value)} value={amount}></input>
                </div>
                <button type="submit" className='btn btn-sm border-none bg-primary rounded-xl normal-case'>
                    Add
                </button>
                </form>
            </div>
            </div>
        </div>
        )
  }


export default AddExpense
