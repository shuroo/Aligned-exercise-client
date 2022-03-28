import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'; 

function FooterButtonsComponent({viewAddUserPg,deleteUserFunction}) {

return (
<Form.Group className="row">
      <Button variant="primary" type="button" onClick={deleteUserFunction}>
        Delete
    </Button><Button variant="primary" type="button" onClick={(e)=>viewAddUserPg(true)}>
        Add User
    </Button>
          </Form.Group>  
          
 );
}



export default FooterButtonsComponent;