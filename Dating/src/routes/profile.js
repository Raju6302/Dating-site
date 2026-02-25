const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validateProfileEdit } = require("../utils/validate");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEdit(req)) {
      throw new Error("profile edit is not valid");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    if (!validator.isStrongPassword(password)) {
      throw new Error("Please enter the strong password");
    }
    const user = req.user;
    await user.updatePassword(password);
    await user.save();
    res.send(`${user.firstName}, password is updated successfully`);
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

module.exports = profileRouter;
