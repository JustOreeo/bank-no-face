import React,{useState, useEffect} from 'react';
import { toast } from "react-toastify";
import useProfile from '../hooks/useProfile';
const RecipientTable = ({recipients,setRecipients}) => {
    const {user} = useProfile();
    
    const showToastMessage = (isSuccess) => {
        if(isSuccess === true) {
            toast.success('Recipient Deleted Successfully!', {
              position: toast.POSITION.TOP_RIGHT
          });
        } 
    };
    
    //map only recipients of current user
    let userRecipients=[];
    recipients.map((recipient)=>{
        if(recipient.senderEmail===user.email){
            userRecipients.push(recipient)
        }
    })

    // delete recipient
    const deleteRecipients=(id)=>{
        const filteredRecipients=userRecipients.filter((element,index)=>{
            return element.id !== id
        })
        setRecipients(filteredRecipients);
        localStorage.setItem('recipients',JSON.stringify(filteredRecipients));
        showToastMessage(true)
    }
    
    return (
        <>
            <div className='overflow-x-auto pt-5 w-full'>
                {userRecipients.length>0&&
                    <>
                    <div className=''>
                        <table className='table w-full border text-center'>
                        <thead >
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Category</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userRecipients.map((recipient,index)=>(
                            <tr key={index}>
                                <th>{index+1}</th>
                                <td>{recipient.recipientName}</td>
                                <td>{recipient.recipientEmail}</td>
                                <td>{recipient.category}</td>
                                <td onClick={()=>deleteRecipients(recipient.id)}>
                                <i className='fa-solid fa-trash'/>
                                </td>           
                            </tr>            
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
                    </>
                }
                {userRecipients.length < 1 && 
                    <div>No recipients are added yet</div>
                }
            </div>
        </>
    )
}

export default RecipientTable;
