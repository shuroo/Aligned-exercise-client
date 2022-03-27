class UserModel{
    constructor(firstName,lastName,email,status,index){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.status = status;
        this.key=firstName+'_'+lastName+index;
    }
}

export default UserModel;