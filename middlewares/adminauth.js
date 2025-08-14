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
module.exports={adminauth}