const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["Ignored", "Interested"];
      if (!allowedStatus.includes(status)) {
        return res.json({ message: `status is not valid  ${status}` });
      }

      if (fromUserId.equals(toUserId)) {
        return res
          .status(400)
          .json({ message: "can't send request to yourself" });
      }

      const isToUserExist = await User.findById(toUserId);
      if (!isToUserExist) {
        return res.status(400).json({ message: "user not exist." });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "connection request is already exists" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const savedData = await connectionRequest.save();
      res.json({
        message: "connection request sent successfully",
        data: savedData,
      });
    } catch (err) {
      res.status(400).send("Error " + err.message);
    }
  }
);

requestRouter.post(
  "/request/view/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["Accepted", "Rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .send(400)
          .json({ message: `status is not allowed ${status}` });
      }

      const connectionRequestDetails = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser,
        status: "Interested",
      });

      if (!connectionRequestDetails) {
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      };

      connectionRequestDetails.status = status;

      const data = await connectionRequestDetails.save();
      res.json({ message: "Request status" + status, data });
    } catch (err) {
      res.status(400).send("Error " + err.message);
    }
  }
);

module.exports = requestRouter;
