const validator=require('validator')
const validateSignUpData=(req)=>{
const {firstName,lastName,emailId,password}=req.body;
if(!firstName || !lastName){
    throw new Error("Enter valid Name")
    
}
else if(!validator.isStrongPassword(password)){
    throw new Error('Password is not strong ')
}
else if(!validator.isEmail(emailId)){
    throw new Error('Enter a valid email Id')
}

}
module.exports={validateSignUpData}