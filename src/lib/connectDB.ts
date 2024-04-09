import mongoose from "mongoose";

async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(mongoURI);
   
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error mongo--->", error);
    throw new Error("Connection failed!");
  }
}

export default connectDB;
