const express = require("express");
const { userAuth } = require("../../middlewares/adminauth");
const { ConnectionModel } = require("../models/makeConnection");
const{User}=require('../models/user')
const connectionRequest = express.Router();

connectionRequest.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const userData = req.user;
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      

      const StatusAllowed = ["Interested", "Ignored"];
      if (!StatusAllowed.includes(status)) {
        throw new Error("Invalid status sent");
      }

      const checkExistingRequest = await ConnectionModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (checkExistingRequest) {
        throw new Error("connection request already sent");
      }

      if(fromUserId==toUserId){
        throw new Error('cannot sent request to yourself')
      }

      const userExist=await User.findById(toUserId)
      console.log(userExist)
      if(!userExist){
        throw new Error("Don't try to send request to random user")
      }

      

      const request = new ConnectionModel({
        toUserId,
        status: req.params.status,
        fromUserId,
      });
      const savingRequest = await request.save();
      res.json({
        message: `${userData.firstName} Connection request sent successfully to ${userExist.firstName} `,
        data: savingRequest,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: `Error sending request` + error.message });
    }
  }
);

module.exports = connectionRequest;
