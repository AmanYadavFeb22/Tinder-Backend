const express=require('express')
const{userAuth}=require('../../middlewares/adminauth')
const connectionRequest=express.Router()

connectionRequest.post("/SendConnectionRequest",userAuth,(req,res)=>{
  const user=req.user
  
  res.send("connection request sent by" + user.firstName)

})

module.exports=connectionRequest