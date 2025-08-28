const express = require("express");
const connectdb = require("./config/database");
const bcrypt = require("bcrypt");
const { User } = require("./models/user");
const cookieparser=require('cookie-parser')
const jwt=require('jsonwebtoken')
const{userAuth}=require('../middlewares/adminauth')
const { validateSignUpData } = require("./utils.js/validation");
const authRouter=require('./routes/authRouter')
const userRouter=require('./routes/userRouter')
const profileRouter=require('./routes/profileRouter')
const connectionRequest=require('./routes/connectionRequest')
const cors=require('cors')
const app = express();
const PORT = 3000;


app.use(cors({
  origin:'http://localhost:5173/',
  credentials:true
}))
app.use(express.json());
app.use(cookieparser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",connectionRequest)
app.use("/",userRouter)



//Getting a user data from the database by email
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

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
    if (user.length === 0) {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(400).send("Error sending data");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("Error deleting  data");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = [
      "About",
      "Skills",
      "Gender",
      "age",
      "photoUrl",
      "password",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new Error("update not allowed" + error.message);
    }
    if (data.Skills.length > 10) {
      throw new Error("Skills must be less than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Error updating data " + error.message);
  }
});

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
