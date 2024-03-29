import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connect to DB");
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export default connectDB;
