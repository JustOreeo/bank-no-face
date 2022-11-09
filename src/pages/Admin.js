import React from 'react'
import AccountDetails from '../components/common/AccountDetails'
import Transactions from '../components/common/Transactions'

const Admin = ({user}) => {
    console.log("Admin: ",user)
    console.log("Admin Name: ",user.name)
    console.log("Admin Name: ",user.name)
  return (
    <div>
        Admin
        <AccountDetails userInfo={user}/>
        <Transactions userInfo={user}/>
    </div>
  )
}

export default Admin