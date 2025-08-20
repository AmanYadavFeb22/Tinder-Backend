const express = require("express");
const { userAuth } = require("../../middlewares/adminauth");
const { ConnectionModel } = require("../models/makeConnection");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;
    const connectionRequest = await ConnectionModel.find({
      toUserId: logginUser._id,
      status: "Interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "About",
      "photorl",
      "age",
    ]);
    if (!connectionRequest) {
      throw new Error("There is no pending request");
    }

    res.json({
      message: `Fetched all pending request`,
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).send("Error getting request received" + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;
    const connectionRequest = await ConnectionModel.find({
      $or: [
        { toUserId: logginUser._id, status: "accepted" },
        { fromUserId: logginUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName About age photoUrl Skills")
      .populate("toUserId", "firstName lastName About age photoUrl Skills");

    if (!connectionRequest) {
      throw new Error("No connection found");
    }

    const request = connectionRequest.map((data) => {
      if (logginUser._id.toString() === data.fromUserId._id.toString()) {
         return data.toUserId;
      }

      return data.fromUserId;
    });

    res.json({
      data: ` you have connection with these people`,
      message: request,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

module.exports = userRouter;
