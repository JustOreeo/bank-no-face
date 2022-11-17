import React, {useState, useEffect} from 'react'

//Import Components
import AddRecipient from '../components/Recipients/AddRecipient';
import RecipientTable from '../components/Recipients/RecipientTable'
import useProfile from '../components/hooks/useProfile';
// getting the values of local storage
const getDatafromLS = () => {
    
    const data = localStorage.getItem('recipients');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
}
  
const Recipients = () => {
  const {user} = useProfile();
  console.log("recipient:",user)
   // main array of objects state || recipient state || recipient array of objects
  const [recipients, setRecipients]=useState(getDatafromLS());
  const recipientHistory= JSON.parse(localStorage.getItem('recipients'))

  // saving data to local storage
  useEffect(()=>{
    if (recipientHistory === null) {
      localStorage.setItem("recipients", JSON.stringify([]));
    }else{
      localStorage.setItem('recipients',JSON.stringify(recipients));
    }
  },[recipients])

  return (
      <div>
          <h2 className="component-header">Recipient</h2>
          <div className='pt-5'>
            <label for="my-modal-3" class="btn btn-sm border-none bg-primary rounded-xl normal-case">Add recipient</label>
          </div>
          <input type="checkbox" id="my-modal-3" class="modal-toggle" />
          <label for="my-modal-3" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
              <label for="my-modal-3" class="absolute right-2 top-2">
                <i class="fa-solid fa-circle-xmark"></i>
              </label>
              <AddRecipient recipients={recipients} setRecipients={setRecipients}/>
            </label>
          </label>
          
          <RecipientTable recipients={recipients} setRecipients={setRecipients}/> 
      </div>
  )
}

export default Recipients;