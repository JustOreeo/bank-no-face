import React,{useState, useEffect} from 'react'
import { useProfileContext } from '../hooks/useProfile';

const Name = () => {
  const { user } = useProfileContext();

  return (
    <div className="main-header">
      <p className="app-name">
        Dae<span>bank</span>
      </p>
      <p className="greet-user">
        Welcome back, <span>{user.name}</span>!
      </p>
    </div>
  );
  
}

export default Name;