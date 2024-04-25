// import mongoose from "mongoose";

// async function connectDB() {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://fatemeghafari77:NoERisX99wBrN4Bl@cluster0.xhmztka.mongodb.net/?retryWrites=true&w=majority"
//     );
//     // await mongoose.connect(process.env.MONGO_URI);
//     console.log("connect to DB");
//   } catch (error) {
//     console.log("error mongo--->", error);
//     throw new Error("Connection failed!");
//   }
// }

// export default connectDB;



import mongoose from "mongoose";

const { MONGO_URI } = process.env

if (!MONGO_URI)
    throw new Error("Invalid env variable: MONGO_URI");

 const connectDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        return
    }

    try {
        const { connection } = await mongoose.connect(MONGO_URI)

        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectDB;
