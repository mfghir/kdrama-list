import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://fatemeghafari77:NoERisX99wBrN4Bl@cluster0.xhmztka.mongodb.net/?retryWrites=true&w=majority"
    );
    // await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to DB");
  } catch (error) {
    console.log("error mongo--->", error);
    // throw new Error("Connection failed!");
  }
}

export default connectDB;






