import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import UserModel from '../model/UserModel';
import axios from 'axios';

function AddUserComponent({maxId}){

    const addUserURL = 'http://localhost:9000/users/add';
    const initialStatus = 'Active';
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    function refreshPage() {
        return window.location.reload();
    }
    //todo: pass via parent and - in state.
    function addUser(userToAdd) {  
        let jsonUsr = JSON.stringify(userToAdd)
        console.log('Saving user:'+jsonUsr)
          axios
            .post(addUserURL,userToAdd )
            .then(() => console.log('User Created'))
            .catch(err => {
              console.error(err);
            });

        };

    // Build user and send it to the db    
    function buildAndSendUser(){
        try{
            if(!firstName && !lastName){
                throw 'invalid user data. required fields are missing. aborting';
                return;
            }
            let nextUserId = maxId; // index
            try{
                nextUserId = Number(maxId)+1; 
            }
            catch(err){
                    console.log(err)
                    // if the id is correpted, rand some id and use it for save (should be unique).
                    nextUserId = Math.floor(Math.random() * 100000)
            }
        
            const userToAdd = new UserModel(firstName,lastName,email,initialStatus,
                nextUserId);  
            addUser(userToAdd);  
            return;
        }
        finally{
            // Reload the page after user addition (will also restore the users list displayed) 
            refreshPage();
        }
    };
    return (
        <Form >
        <Form.Group className="formItem" controlId="userFirstName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name"  
            value={firstName} onChange={e => setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="formItem" controlId="userLastName">
            <Form.Label>Last Name</Form.Label> 
            <Form.Control type="text" placeholder="Enter Last Name"  
            value={lastName} onChange={e => setLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="formItem" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email"
            value={email} onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={()=>buildAndSendUser()}>
            Done
        </Button>
        </Form>

      ); 
}

export default AddUserComponent;
