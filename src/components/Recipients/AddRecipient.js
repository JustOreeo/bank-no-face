/* eslint-disable no-restricted-globals */
import React, { useState,useEffect } from 'react';
import { toast } from "react-toastify";
import useProfile from '../hooks/useProfile';
import { v4 as uuidv4 } from 'uuid';
const AddRecipient = ({recipients, setRecipients,userInfo}) => {
    const {user} = useProfile();
    const storedAccounts=JSON.parse(localStorage.getItem("users"));
    // input field states
    const [recipientName, setRecipientName]=useState('');
    const [recipientEmail, setRecipientEmail]=useState('');
    const [category, setCategory]=useState('');

    const showToastMessage = (isSuccess) => {
        if(isSuccess === true) {
          toast.success('Recipient Added Successfully!', {
              position: toast.POSITION.TOP_RIGHT
          });
        } else {
            if(isSuccess==="User does not exists"){
                toast.error('User does not exists!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
                toast.error('Please complete all fields!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
         
        }
    };

    // form submit events
    const handleAddRecipientsubmit = async (e) => {
        e.preventDefault();
        // creating an object
        let recipient={
            recipientName,
            recipientEmail,
            category,
        }
        //add user email
        recipient.id=uuidv4()
        recipient.senderEmail=user.email
        let found=false;
        //check if recipient email exists
        storedAccounts.forEach((userData) => {
            if (recipient.recipientEmail === userData.email) { 
                found = true;
                return
            }     
            });
            if(found===true){
                console.log("User exists");

                if (!recipientName ||!recipientEmail|| !category) {
                    showToastMessage(false);
                    return
                }
                await setRecipients([...recipients,recipient]);
                showToastMessage(true)
                setRecipientName('');
                setRecipientEmail('');
                setCategory('');

            }else{
               showToastMessage("User does not exists");
               return
            }  
        
        
         
    }

    return (
        <div className=''>
            <div className=''>
            <div className=''>
                <form autoComplete="off" className='' onSubmit={handleAddRecipientsubmit}>
                <div className='mb-3 xl:w-96'>
                    <label className='text-xs'>Recipient Name</label>
                    <input type="text" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                    onChange={(e)=>setRecipientName(e.target.value)} value={recipientName}></input>
                </div>
                <div className='mb-3 xl:w-96'>
                    <label className='text-xs'>Recipient Email</label>
                    <input type="text" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                    onChange={(e)=>setRecipientEmail(e.target.value)} value={recipientEmail}></input>
                </div>
                <div className='mb-3 xl:w-96'>
                    <select 
                        onChange={(e)=>setCategory(e.target.value)} 
                        value={category}
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                    >     
                        <option>Select Category</option>
                        <option>Family</option>
                        <option>Friend</option>
                        <option>Relatives</option>
                        <option>Others</option>
                        <option>Enemy</option>
                        <option>Frenemy</option>   
                    </select>
                </div>
                <button type="submit" className='btn btn-sm border-none bg-primary rounded-xl normal-case'>
                    Add
                </button>
                </form>
            </div>
            </div>
        </div>
        )
  }


export default AddRecipient