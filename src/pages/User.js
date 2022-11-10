import React from 'react'
import AccountDetails from '../components/common/AccountDetails'
import Transactions from '../components/common/Transactions'

const User = ({userInfo}) => {

  return (
    <div>User
        <AccountDetails userInfo={userInfo}/>
        <Transactions userInfo={userInfo}/>
    </div>
    
  )
}

export default User