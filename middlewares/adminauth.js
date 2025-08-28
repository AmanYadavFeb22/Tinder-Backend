const jwt=require('jsonwebtoken')
const { User } = require('../src/models/user');
const userAuth=async(req,res,next)=>{
    try{const {token}=req.cookies
    if(!token){
        return res.status(401).send("Please Login to Move Forward!")
    }
    const validatetoken=await jwt.verify(token,"TINDER@538")
    const{_id}=validatetoken
    const user=await User.findById(_id)
    if(!user){
        throw new Error("User does exist")
    }
    req.user=user
    next()}
    catch(err){
        throw new Error("ERROR: "+err.message)
    }


}

const adminauth=(req,res,next)=>{
    const token="xyz"
    const isAuthorised=token==="xyz"
    if(!isAuthorised){
       res.status(401).send("unauthorised access")
        
    }
    else{
        next()
    }

}
module.exports={adminauth,userAuth}