const express=require('express')
const {validateSignUpData}=require('../utils.js/validation')
const bcrypt=require('bcrypt')
const {User}=require('../models/user')
const authRouter=express.Router()

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("email id does not exist");
    }

    const isValidPassword = await user.verifyPassword(password);
    if (isValidPassword) {
      const token=await user.getJwt()
      res.cookie("token",token)
      
      res.send("Login successfull");
    } else {
      throw new Error("wrong password");
    }
  } catch (error) {
    res.status(500).send("Error saving user data" + error.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Details saved successfully");
  } catch (error) {
    res.status(500).send("Error saving user data" + error.message);
  }
});


authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{expires:new Date(Date.now())})
  res.send("Logout successfull")
})
module.exports=authRouter
