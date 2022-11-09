import React from 'react'
import Transactions from '../components/common/Transactions'

const Transaction = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const userLists = JSON.parse(localStorage.getItem('users'))
  const showTransaction="All"
  //finds the user and get its value 
  let currentUser;
  userLists.forEach(user => {
      if(user.email === loggedInUser.email) {
          currentUser=user;
      }
  })
  //check current user
  console.log("Current User: ",currentUser)
  return (
    <div>
      <Transactions userInfo={currentUser} showTransaction={showTransaction}/>
    </div>
  )
}

export default Transaction