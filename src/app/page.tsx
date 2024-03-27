
import KdramaList from "@/components/KdramaList";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import connectDB from "@/lib/connectDB";
import User from "@/models/user";


export default async function Home() {
  // const session = await getServerSession(authOptions);
  // const user = await User.aggregate([
  //   { $match: { email: session?.user?.email } },
  //   {
  //     $lookup: {
  //       from: "kdramamodels",
  //       foreignField: "userId",
  //       localField: "_id",
  //       as: "kdrama",
  //     },
  //   },
  // ]);

  // console.log("Home user test", user);
  // console.log("Home user kdramas", user.kdramas);

  // await connectDB()
  // const user = await User.findOne({ email: session?.user?.email });

  return <KdramaList  />
}
