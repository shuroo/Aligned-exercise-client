import React from "react"; 
import { Container } from "react-bootstrap";
import UserItemComponent from "./UserItemComponent";

// Create and display the entire users list:
function UserListComponent({users}){

    // check if list is empty
    if(users.length === 0){
        return null;
    }

    let usersHtmlList = users.map(user=>{
    return <UserItemComponent key={user._id} user={user}/>
    })
    return(  
            <Container>{usersHtmlList}</Container>
            
            )

}

export default UserListComponent;