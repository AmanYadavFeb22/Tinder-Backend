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

const ValidateProfileEdit=(req)=>{
     const UPDATE_ALLOW = [
    "firstName",
    "lastName",
    "About",
    "Skills",
    "Gender",
    "age",
    "photoUrl"
  ];

  const isUpdateAllow=Object.keys(req.body).every(field => UPDATE_ALLOW.includes(field))
  return isUpdateAllow;
  
}



module.exports={validateSignUpData,ValidateProfileEdit}