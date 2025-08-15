const express = require("express");
const connectdb = require("./config/database");
const { User } = require("./models/user");
const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);
  //creating a new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Details saved successfully");
  } catch (error) {
    res.status(500).send("Error saving user data");
  }
});

//Getting a user data from the database
app.get("/user", async (req, res) => {
  const userData = req.body.emailId;
  try {
    const user = await User.find({ emailId: userData });
    console.log(user);
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Error sending data");
  }
});

// finding only one user

app.get("/user",async(req,res)=>{
    const userData=req.body.emailId
    const user=await User.findOne()
    res.send(user)

})

app.get("/feed",async(req,res)=>{
    try {
        const user=await User.find({})
        res.send(user)
        if(user.length===0){
            res.status(404).send("user not found")
        }

        
    } catch (error) {
        res.status(400).send("Error sending data");
    }
})

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId
    try {
        
        const user=await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
        
    } catch (error) {
        res.status(400).send("Error deleting  data");
    }
})

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId
    const data=req.body
    try {
       
       const user= await User.findByIdAndUpdate(userId,data)
       res.send("User updated successfully")
        
    } catch (error) {
         res.status(400).send("Error updating data");
        
    }

})

connectdb()
  .then((res) => {
    console.log("connected to database successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to database");
  });
