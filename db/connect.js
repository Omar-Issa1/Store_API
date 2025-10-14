import mongoose from "mongoose";

const connectDB = async (url) => {
  await mongoose.connect(url, {
    dbName: "Store-api",
  });
};

export default connectDB;
