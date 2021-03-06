import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'; 
import './UserItem.css';
import Dropdown from 'react-dropdown';
import axios from 'axios'; 

// Representation for user in the users list.
function UserItemComponent({checkedUsers,user}) {
   
  
  // parameter to save the checkbox current state -
  const [isChecked, setIsChecked] = useState(false);

  const [editStatusDisabled, setEditStatusDisabled] = useState(true);

  const setUserStatusURL = 'http://localhost:9000/users/status';
    
  // It should have been passed via the parent, but failed to do this.

  function setUserStatus(status){
    user.status = status;  
    console.log(JSON.stringify(user))
      axios
      .post(setUserStatusURL,user)
      .then(() => console.log('User Updated.'))
      .catch(err => {
        console.error(err);
      });
  };
  function checkCheckbox(){
    let userId = user._id;
    let toCheck = !isChecked

    if(toCheck){
      checkedUsers.push(userId)
    }
    else{
      checkedUsers.splice(userId,1)
    }
    setIsChecked(toCheck)
  }
  
    return (
    <Container className="listItem">
      <Form onSubmit={((e)=>{ e.preventDefault();return false;})}>
        <Container className="row ">
        <Form.Check type="checkbox" 
                checked={isChecked}
                onChange={(e)=>checkCheckbox(e)}
        label={user.firstName+" "+user.lastName} />

             <Dropdown options={["Active","Invited","Disabled"]} 
              onChange={(e)=>setUserStatus(e.value)}
            value={user.status} disabled={editStatusDisabled} />  
        
    
        <div className="imgDiv" onClick={()=>{ 
       setEditStatusDisabled(false)}}/> 
      
        </Container>
      </Form>
    </Container>
    );
       
}

export default UserItemComponent;
