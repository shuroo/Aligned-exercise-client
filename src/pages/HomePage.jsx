
import React, { useState, useEffect } from 'react';
import UserModel from '../model/UserModel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import UserListComponent from '../components/UserListComponent';
import AddUserComponent from '../components/AddUserComponent';
import FooterButtonsComponent from '../components/FooterButtonsComponent';

function HomePage(){

        const fetchUsersURL = '/users';
        const addUserURL = '/users/add';
        const deleteUserURL = '/users/delete/';

        const [users, setUsers] = useState([]);
        // use these indexes to delete these users from db
        //const [checkedUserIndexes, setCheckedUserIndexes] = useState([]);

        const [usersCount, setUsersCount] = useState(0);
        const [addUsrFlag, setAddUsrFlag] = useState(false);
   
        function fetchDBUsers(){
          axios.get(fetchUsersURL)
          .then(res => { 
                  return res.data;
              })
              .then(users => { 
                  let usersData = [];
                  users.data.map(usr=>usersData.push(usr));
                  setUsers(usersData);
                  let count = usersData.length+1;
                  setUsersCount(count);
              });
          }

      
        function addUser(userToAdd) { 
                console.log('in addUser!!');
                let jsonUsr = JSON.stringify(userToAdd)
                console.log(jsonUsr)
                  axios
                    .post(addUserURL,userToAdd )
                    .then(() => console.log('User Created'))
                    .catch(err => {
                      console.error(err);
                    });
 
                };
              
        function removeUser(userId){

                axios
                .delete(deleteUserURL+userId)
                .then(() => console.log('User Removed'))
                .catch(err => {
                  console.error(err);
                });
            };

                  // const listUsers = (!!addUsrFlag ? null :
      //    <UserListComponent index={usersCount} users={users} addUser={addUser} 
      //    removeUser={removeUser} setAddUsrFlag={setAddUsrFlag}/>);         

          
        //On Page Load:
        useEffect(() => {
          fetchDBUsers();
        },[]);


        const addUsrPg = (!!addUsrFlag ? 
          <AddUserComponent index={usersCount} 
          addUser={addUser}/> : null) 
   
             
      return <div>
        <Container>
            <h1>Users</h1>
            <UserListComponent users={users}></UserListComponent>
             <FooterButtonsComponent   
             deleteUserFunction={removeUser} viewAddUserPg={setAddUsrFlag} />
             </Container>
        {addUsrPg}
        </div>;
  };
      
  export default HomePage; 


