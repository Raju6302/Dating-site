const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const RETRIVE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "Interested",
    }).populate("fromUserId", RETRIVE_DATA);

    // res.json({
    //   message: "Data fetched successfully",
    //   data: connectionRequests,
    // });
    res.send(connectionRequests)
  } catch (err) {
    res.status(500).json({message: "Something went wrong."});
  }
});

// all accepted connections 
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "Accepted" },
        { fromUserId: loggedInUser._id, status: "Accepted" },
      ],
    })
      .populate("fromUserId", RETRIVE_DATA)
      .populate("toUserId", RETRIVE_DATA);


      console.log("connection Requests: ", connectionRequests)
      // const data = connectionRequests.map((row) => {
      //   if ( row.fromUserId && row.fromUserId._id && row.fromUserId._id.toString() === loggedInUser._id.toString()) {
      //     return row.toUserId;
      //   }
      //   return row.fromUserId;
      // })

        const data = connectionRequests
      .filter(row => row.fromUserId && row.toUserId)
      .map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      })
      .filter(user => user); // Filter null users just in case

      console.log("data", data)

      res.json({message : `${loggedInUser.firstName} your connections`, data: data})

  } catch (err) {
    res.status(500).json({message: "Something went wrong."});
  }
});

userRouter.get("/user/feed", userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id}
      ]
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString())
    })

    const users = await User.find({
      $and: [
        {_id : { $nin: Array.from(hideUsersFromFeed)}},
        {_id : {$ne: loggedInUser._id}}
      ]
    }).select(RETRIVE_DATA).skip(skip).limit(limit);

    res.json({data: users})

  } catch (err) {
    res.status(500).json({message: "Something went wrong."});
  }
})

module.exports = userRouter;
