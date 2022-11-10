import React, { useState,useEffect } from 'react'
import { demoRecentTransactions } from '../../constants/demoRecentTransactions';

const Transactions = ({userInfo,showTransaction}) => {

    const [empty,setEmpty]=useState('');
    console.log("Recent Transactions User Role: ",userInfo.role)
    console.log("Show Transaction: ",showTransaction);
    
    const recentTransactions=demoRecentTransactions
    let userTransactions=[];
    recentTransactions.forEach((user) => {
        //console.log("Length:",userTransactions.length)
        //get only the transactions from user here
        if(user.from === userInfo.email&&userInfo.role==="User") {
            //console.log("User Email",user.from)
             //filter to 5 transactions only
             if(showTransaction==="All"){
                userTransactions.push(user) 
             }else{
                if(userTransactions.length<5){
                    userTransactions.push(user) 
                }  
             }  
        }
        //if admin all transactions
        if(userInfo.role==="Admin"){
            if(showTransaction==="All"){
                userTransactions.push(user) 
             }else{
                if(userTransactions.length<5){
                    userTransactions.push(user) 
                }  
             }
        }          
    })
    useEffect(() => {
        if(userTransactions.length===0){
            setEmpty("true")
        }else{
            setEmpty("false")
        }
    })

    let headers;
    let transactionsInfo;
    if(userTransactions.length!==0){
        //reverse to get the latest transaction on top
        userTransactions.reverse();
        //check user transactions
        console.log("Transactions Current User: ",userTransactions)
        //headers for table
        headers=Object.keys(userTransactions[0]);
        //rows value
        transactionsInfo=Object.values;
    }
    return (
        <div>
            <div className='flex gap-4 justify-content'>
                <span>{showTransaction!=="All"&&'Recent'}Transactions</span>
                {showTransaction!=="All"&&empty==="false"&&
                    <button className='btn btn-xs'>View More</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table table-compact text-center">
                    {empty===false&&
                        <thead>
                            
                            <tr>
                                <th></th>
                                {headers.map((key) => (
                                <th>{key}</th>
                                ))}
                            </tr>
                            
                        </thead>
                    }
                    <tbody>
                    {userTransactions.map((item,index) => (
                        <tr key={index} className="hover">
                            <th>{index+1}</th>
                            {transactionsInfo(item).map((value) => (
                                <td>{value}</td>
                            ))}
                        </tr>
                    ))}
                    {empty==="true"&&
                        <tr>
                            <td>Nothing to show here</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transactions