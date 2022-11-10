import React,{useState, useEffect} from 'react'
import { useProfileContext } from '../hooks/useProfile';

const Name = () => {
  const { user } = useProfileContext();

  return (
    <div>Welcome back, {user.name} !</div>
  )
  
}

export default Name;