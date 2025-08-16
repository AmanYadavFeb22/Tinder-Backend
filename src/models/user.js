const mongoose = require("mongoose");
const validator=require('validator');
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 30
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(Value){
      if(!validator.isEmail(Value)){
        throw new Error("Enter a valid email address")
      }

    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a Strong Password")
      }
    }
  },
  age: {
    type: Number,
    min: 18
  },
  Gender: {
    type: String,
    validate(value) {
      if (!["Male","Female","Others"].includes(value)) {
        throw new Error("Gender is not Valid");
      }
    },
  },
  Skills: {
    type: [String]
  },

  About: {
    type: String,
    default: "This is an default about "
  },
  
  photoUrl: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUxAbfR46H-_MPyA4voc5Kz8e6MlT0iI3z2OuaP8-8SvTbYdsNyRGMaCzthVvghkqqKjo&usqp=CAU",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Enter a valid url")
        }
      }
  },
  Country: {
    type: String,
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = { User };
