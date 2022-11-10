import React from 'react'

const Depo = ({balance, setBalance, input, }) => {

const depositHandler = () => {
        setBalance(balance + parseInt(input))
}

  return (
    <div><button className="btn btn-sm" onClick={depositHandler}>deposit</button></div>
  )
}

export default Depo