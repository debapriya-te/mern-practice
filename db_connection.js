const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI || "";
let mongoose_client;
const connectToDB = async () => {
  try {
    mongoose_client = await mongoose.connect(connectionString);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectToDB, mongoose_client, mongoose };
