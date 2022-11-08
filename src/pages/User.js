import React from 'react'
import AccountDetails from '../components/common/AccountDetails'
import RecentTransactions from '../components/common/RecentTransactions'
const User = ({user}) => {
    console.log("User Info: ",user)
    console.log("User Role: ",user.role)

  return (
    <div>User
        <AccountDetails userInfo={user}/>
        <RecentTransactions userInfo={user}/>
    </div>
    
  )
}

export default User