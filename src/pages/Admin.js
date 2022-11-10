import React from 'react'
import AccountDetails from '../components/common/AccountDetails'
import Transactions from '../components/common/Transactions'

const Admin = ({userInfo}) => {

  return (
    <div>
        Admin
        <AccountDetails userInfo={userInfo}/>
        <Transactions userInfo={userInfo}/>
   
    </div>
  )
}

export default Admin