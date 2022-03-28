import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'; 
import './UserItem.css';

// Representation for user in the users list.
function UserItemComponent({index,checkedUsers,user}) {
   
  // parameter to save the checkbox current state -
  const [isChecked, setIsChecked] = useState(false);

  function checkCheckbox(){
    debugger;
    let userId = user._id;//e.target.id;      
    console.log('the current user is.....:'+JSON.stringify(user))
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
    <Container className="formWrapper">
      <Form onSubmit={((e)=>{ e.preventDefault();return false;})}>
        <Container className="row">
        <Form.Check type="checkbox" 
                checked={isChecked}
                onChange={(e)=>checkCheckbox(e)}
        label={user.firstName+" "+user.lastName} />
            
        <Form.Label>{user.status}</Form.Label> 
          
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>   
        </Container>
      </Form>
    </Container>
    );
       
}

export default UserItemComponent;
