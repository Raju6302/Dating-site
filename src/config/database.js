const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
   "mongodb+srv://vijay:DSRCWT4TbbK3GRd@cluster0.bqozzjf.mongodb.net/Dating"
  );
};

module.exports = connectDB;