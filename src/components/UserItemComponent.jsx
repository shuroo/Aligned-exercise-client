import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'; 
import './UserItem.css';
import Dropdown from 'react-dropdown';
import axios from 'axios';
import { Image } from 'react-bootstrap';

// Representation for user in the users list.
function UserItemComponent({checkedUsers,user}) {
   
  
  // parameter to save the checkbox current state -
  const [isChecked, setIsChecked] = useState(false);

  const [editStatusDisabled, setEditStatusDisabled] = useState("DISABLED");

  const setUserStatusURL = 'http://localhost:9000/users/status';
    
  // It should have been passed via the parent, but failed to do this.
  function refreshPage() {
      return window.location.reload();
  }

  function setUserStatus(){  
    console.log(JSON.stringify(user))
      axios
      .post(setUserStatusURL,user)
      .then(() => console.log('User Updated.'))
      .catch(err => {
        console.error(err);
      });
  };
  function checkCheckbox(){
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
    
            <Dropdown options={["Active","Invited","Disabled"]} onChange={setUserStatus} 
            value={user.status} disabled={editStatusDisabled} />;  
        
        <Image className="pancil" src="./pancil_icon.png" onClick={()=>{console.log("!!!");
       setEditStatusDisabled(false)}}/>  
        </Container>
      </Form>
    </Container>
    );
       
}

export default UserItemComponent;
