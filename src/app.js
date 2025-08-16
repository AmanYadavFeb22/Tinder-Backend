const express = require("express");
const connectdb = require("./config/database");
const bcrypt = require("bcrypt");
const { User } = require("./models/user");
const { validateSignUpData } = require("./utils.js/validation");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("email id does not exist");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      res.send("Login successfull");
    } else {
      throw new Error("wrong password");
    }
  } catch (error) {
    res.status(500).send("Error saving user data" + error.message);
  }
});

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
