import React from 'react'

const With = ({input, setBalance, balance}) => {

const withdrawHandler = () => {

        setBalance(balance - parseInt(input))
        
    }
    
  return (
    <div><button className="btn btn-sm" onClick={withdrawHandler}>Withdrawal</button></div>
  )
}

export default With;