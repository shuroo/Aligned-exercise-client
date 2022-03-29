import React from "react";  
import UserListComponent from "./UserListComponent";
import FooterButtonsComponent from "./FooterButtonsComponent";

// Seperated component for list view displayed
function ListViewComponent({users,setAddUsrFlag,checkedUserIndexes}){

    return  (<div>
    <UserListComponent users={users} 
        checkedUserIndexes={checkedUserIndexes} >
    </UserListComponent>

     <FooterButtonsComponent 
       setViewAddUserPg={setAddUsrFlag}  checkedUserIndexes={checkedUserIndexes} />
     </div>)
}

export default ListViewComponent;