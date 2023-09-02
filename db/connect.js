const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose.connect(url);
};
// check for db connection
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection successful");
});
module.exports = connectDB;
