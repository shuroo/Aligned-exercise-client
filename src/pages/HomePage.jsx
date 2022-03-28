
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
        const [users, setUsers] = useState([]);
        // use these indexes to delete these users from db
        const [checkedUserIndexes, setCheckedUserIndexes] = useState([]);

        const [usersMaxId, setUsersMaxId] = useState(0);
        const [addUsrFlag, setAddUsrFlag] = useState(false);
  
        // Grab the users max id to create a user with a unique id upon next user creation
        function findUsersMaxId(usersList){
          let maxId = 0
          for (var usr of usersList){
            let usrId = usr._id;
            if(!isNaN(usrId) &&  Number(usrId) > maxId){
              maxId = Number(usrId);
            }
          }
          setUsersMaxId(maxId); 
          console.log('maxId:::::'+maxId)
        }
        function fetchDBUsers(){
          axios.get(fetchUsersURL)
          .then(res => { 
                  return res.data;
              })
              .then(users => { 
                  let usersData = [];
                  users.data.map(usr=>usersData.push(usr));
                  setUsers(usersData);
                  findUsersMaxId(usersData);

              });
          }
    

                  // const listUsers = (!!addUsrFlag ? null :
      //    <UserListComponent index={usersCount} users={users} addUser={addUser} 
      //    removeUser={removeUser} setAddUsrFlag={setAddUsrFlag}/>);         

          
        //On Page Load:
        useEffect(() => {
          fetchDBUsers();
        },[]);
        
        const addUsrPg = (!!addUsrFlag ? 
          <AddUserComponent maxId={usersMaxId} 
             /> : null) 
   
             
      return <div>
        <Container>
            <h1>Users</h1>
            <UserListComponent users={users} 
            checkedUserIndexes={checkedUserIndexes} ></UserListComponent>
             <FooterButtonsComponent 
               setViewAddUserPg={setAddUsrFlag}   checkedUserIndexes={checkedUserIndexes} />
             </Container>
        {addUsrPg}
        </div>;
  };
      
  export default HomePage; 


