import React from "react"; 
import { Container } from "react-bootstrap";
import UserItemComponent from "./UserItemComponent";

// Create and display the entire users list:
function UserListComponent({users,checkedUserIndexes}){

    
    // check if list is empty
    if(users.length === 0){
        return null;
    }

    let itemIndex = -1;
    let usersHtmlList = users.map(user=>{
    itemIndex++;
    return <UserItemComponent key={itemIndex} id={itemIndex} user={user} 
    checkedUsers={checkedUserIndexes} />
    })
    return(  
            <Container className="listWrapper">{usersHtmlList}</Container>
            
            )

}

export default UserListComponent;