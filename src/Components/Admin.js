import React from 'react'
import { useAuth } from '../Auth'
import { useState } from 'react'
export default function Admin({Userlist}) {
  const auth=useAuth();
  //const userData=JSON.stringify(auth.user.name)
  const userData=auth.user;
  const [state, setState] = useState(Userlist);
  return (
    <>
    <div>
    <p>Hi {userData.name}</p>{/*{userData} objects are not a valid react child*/}
    <p>Display users</p>
    </div>
    </>
  )
}
