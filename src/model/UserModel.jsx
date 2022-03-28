class UserModel{
    constructor(firstName,lastName,email,status,id){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.status = status;
        //for db persist:
        this._id=id;
        // for react id usage:
    }
}

export default UserModel;