const express = require("express");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUp(req);

    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password)

    const user = await User.findOne({email : email});
    if (user) {
      res.json({message : "email is alredy present"})
    }

    const hashPassowrd = await bcrypt.hash(password, 10);
    console.log(hashPassowrd)

    const saveUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassowrd,
    });

    await saveUser.save();
    res.send("user added successfully...");
  } catch (err) {
    res.status(401).send("issue with adding user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000)
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("user loggedout successfully");
});

module.exports = authRouter;
