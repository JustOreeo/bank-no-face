/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

const AddExpense = ({expenses, setExpenses}) => {
    // input field states
    const [expenseName, setExpenseName]=useState('');
    const [category, setCategory]=useState('');
    const [amount, setAmount]=useState('');
    
    // form submit event
    const handleAddExpenseSubmit=(e)=>{
        e.preventDefault();
        // creating an object
        let expense={
            expenseName,
            category,
            amount
        }

        setExpenses([...expenses,expense]);
        setExpenseName('');
        setCategory('');
        setAmount('');
    }

    return (
        <div className=''>
            <div className=''>
            <div className=''>
                <form autoComplete="off" className='' onSubmit={handleAddExpenseSubmit}>
                <div className='mb-3 xl:w-96'>
                    <label className='text-xs'>Expense Name</label>
                    <input type="text" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none' required
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
                    <input type="number" placeholder='Amount' className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none' required
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
