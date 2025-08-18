const express = require("express");
const profileRouter = express.Router();
const{User}=require('../models/user')
const bcrypt=require('bcrypt')
const{ValidateProfileEdit}=require('../utils.js/validation')
const { userAuth } = require("../../middlewares/adminauth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("ERROR " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    
    const userData=req.body

    if(!ValidateProfileEdit(req)){
       throw new Error("invalid update data")
    }
    const loggedInUser=req.user
    const{_id}=loggedInUser
    const updatedProfile=await User.findByIdAndUpdate(_id,userData,{
      runValidators:true
    })
    console.log("updated profile is" + updatedProfile)
    res.send(`${loggedInUser.firstName} profile edited successfully`)
  
  } catch (error) {
    res.send("ERROR"+ error.message)
  }

});

module.exports = profileRouter;
