
import React, { useState, useEffect } from 'react';
import UserModel from '../model/UserModel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import axios from 'axios';
import AddUserComponent from '../components/AddUserComponent';
import ListViewComponent from '../components/ListViewComponent';

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
    
          
        //On Page Load - Fetch db users:
        useEffect(() => {
          fetchDBUsers();
        },[]);
        
        
        // Each param of the above loads a different page.
        const usersList = (!addUsrFlag ? <ListViewComponent 
          
           users={users} 
           setViewAddUserPg={setAddUsrFlag} checkedUserIndexes={checkedUserIndexes}/>
           : null);

        const addUsrPg = (!!addUsrFlag ? <AddUserComponent maxId={usersMaxId} /> :null)
   
             
      return <div>
        {usersList}
        {addUsrPg}
        <ListViewComponent 
          
           users={users} 
           setViewAddUserPg={setAddUsrFlag} checkedUserIndexes={checkedUserIndexes}/>

        </div>;
  };
      
  export default HomePage; 


