import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'; 
import axios from 'axios';

function FooterButtonsComponent({setViewAddUserPg,checkedUserIndexes}) {

    const deleteUserURL = 'http://localhost:9000/users/delete/';
    
    // It should have been passed via the parent, but failed to do this.
    function refreshPage() {
        return window.location.reload();
    }
    // function refreshPage(){
    //     window.location.reload();
    // }
    function removeUser(userId){
        let numericUserId = userId;
        // Handle case when the user id is not numeric by nature - convert to build a proper url.
        try{
             numericUserId = Number(userId);
        }
        catch(err) {
            console.log(err)
        }
        axios
        .delete(deleteUserURL+numericUserId)
        .then(() => console.log('User Removed'))
        .catch(err => {
          console.error(err);
        });
    };




function removeCheckedUsers(){
    if(!checkedUserIndexes){
        return;
    }   

    for (var id of checkedUserIndexes){

    console.log('removing user of id::'+JSON.stringify(id))
    removeUser(id);
    }
    refreshPage();
    
} 

return (
<Form.Group className="row">
      <Button variant="primary" type="button" onClick={()=>removeCheckedUsers()}>
        Delete
    </Button><Button variant="primary" type="button" onClick={(e)=>
        setViewAddUserPg(true)}>
        Add User
    </Button>
          </Form.Group>  
          
 );
}



export default FooterButtonsComponent;