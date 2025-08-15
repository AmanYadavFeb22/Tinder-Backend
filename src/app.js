const express = require("express");
const connectdb=require('./config/database')
const {User}=require('./models/user')
const app = express();
const PORT = 3000;

app.use(express.json())
app.post("/signup",async(req,res)=>{
    console.log(req.body)

    // const userObj={
    //     firstName:"Aman",
    //     lastName:"Yadav",
    //     emailId:"Aman@gmail.com",
    //     password:"Aman@123",
    //     age:12,
    //     Gender:"Male"
    // }
    // creating a new intance of user model
    const user=new User(req.body)
    try {
        await user.save()
        res.send("User Details saved successfully")
        
    } catch (error) {
        res.status(500).send("Error saving user data")
    }

})

connectdb().then((res=>{
    console.log("connected to database successfully")
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

})).catch((err)=>{
    console.log("error connecting to database")
})


