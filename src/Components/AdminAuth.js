import React from 'react'
import { useAuth } from '../Auth';
import { Navigate } from 'react-router-dom';
export function AdminAuth({children}) {
  const auth=useAuth();
  const userData=auth.user;
  console.log("requireauth")
  console.log(userData.isLoggedIn)
  console.log(userData.accountType)
  if(!userData.isLoggedIn||userData.accountType!=="admin"){
      return <Navigate to='/'/>
  }
  return children
}
