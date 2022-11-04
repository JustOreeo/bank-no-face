import React from 'react'
import { useAuth } from '../Auth';

export default function Account() {
  const auth=useAuth();
  const userData=auth.user;
  return (
    <div>
    <p>Hi {userData.name}</p>
    <p>Display recent transactions,card,graph etc</p>
    </div>
   
  )
}
