const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User" //creating a reference to user schema collection
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User"
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Interested", "Ignored", "accepted", "rejected"],
      message: `{VALUE} Invalid Status`,
    },
  },
},{timestamps:true});


// connectionRequestSchema.pre("save",function(next){
//     const connectionRequest=this
//     if(connectionRequest.fromUserId.equals(toUserId)){
//         throw new Error("cannot send request to yourself")
//     }
//     next()
// })


connectionRequestSchema.index({fromUserId:1,toUserId:1})
const ConnectionModel = mongoose.model(
  "ConnectionModel",
  connectionRequestSchema
);



module.exports = { ConnectionModel };
