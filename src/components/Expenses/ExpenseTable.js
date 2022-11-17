import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useProfile from "../hooks/useProfile";
const ExpenseTable = ({ expenses, setExpenses }) => {
  const { user } = useProfile();
  const [totalExpense, setTotalExpense] = useState("");

  const showToastMessage = (isSuccess) => {
    if (isSuccess === true) {
      toast.success("Expense Deleted Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //map only expenses of current user
  let userExpenses = [];
  let total = 0;
  expenses.map((expense) => {
    if (expense.email === user.email) {
      userExpenses.push(expense);
      total += expense.amount;
    }
  });
  useEffect(() => {
    setTotalExpense(total);
    console.log("Total Expense", total);
  }, [expenses]);

  // delete expense
  const deleteExpenses = (id) => {
    const filteredExpenses = userExpenses.filter((element, index) => {
      return element.id !== id;
    });
    setExpenses(filteredExpenses);
    localStorage.setItem("expenses", JSON.stringify(filteredExpenses));
    showToastMessage(true);
  };

  return (
    <>
      <div className="overflow-x-auto pt-5 w-full">
        <div className="stats shadow w-full p-0 mb-1">
          <div className="stat">
            <div className="stat-title">Balance</div>
            <div class="stat-figure">
              <i class="fa-regular fa-credit-card"></i>
            </div>
            <div children="stat-value"> {user.balance}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Expense</div>
            <div class="stat-figure">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            {totalExpense === 0 ? (
              <div children="stat-value">{total}</div>
            ) : (
              <div children="stat-value">{totalExpense}</div>
            )}
          </div>

          <div className="stat">
            <div className="stat-title">Total</div>
            <div class="stat-figure">
              <i class="fa-solid fa-sack-dollar"></i>
            </div>
            {totalExpense === 0 ? (
              <div children="stat-value"> {user.balance - total}</div>
            ) : (
              <div children="stat-value"> {user.balance - totalExpense}</div>
            )}
          </div>
        </div>
        {userExpenses.length > 0 && (
          <>
            <div className="">
              <table className="table w-full border text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>Expense</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userExpenses.map((expense, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{expense.expenseName}</td>
                      <td>{expense.category}</td>
                      <td>{expense.amount}</td>
                      <td onClick={() => deleteExpenses(expense.id)}>
                        <i className="fa-solid fa-trash" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {userExpenses.length < 1 && <div>No expenses are added yet</div>}
      </div>
    </>
  );
};

export default ExpenseTable;
