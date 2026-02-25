const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // get the token
    const { token } = req.cookies;
    //if not token
    if (!token) {
      throw new Error("token is not present...");
    }
    // if there is token we need to verify the token
    const verifyToken = await jwt.verify(token, "Dating@Web$79");
    const { _id } = verifyToken;
    const user = await User.findById(_id);
    if(!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();

  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
};

module.exports = userAuth;
