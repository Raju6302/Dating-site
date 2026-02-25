const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 30,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be either 'male', 'female', or 'other'.",
      },
    },
    photoUrl: {
      type: String,
      default: "https://i.sstatic.net/l60Hf.png",
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is a default about the user.",
    },
  },

  { timestamps: true }
);

//generating jwt token
userSchema.methods.getJwt = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Dating@Web$79", {
    expiresIn: "24h",
  });

  return token;
};

//for checking password confirmation
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}

//for passowrd updating 
userSchema.methods.updatePassword = async function (newPassword) {
  const user = this;
  const newHashPassword = await bcrypt.hash(newPassword, 10);
  user.password = newHashPassword;
}

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
