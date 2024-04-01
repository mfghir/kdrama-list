import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";

import User from "@/models/user";
import HomePage from "@/components/HomePage";


export default async function Home() {
  const session = await getServerSession(authOptions);
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

  const users = await User.find({ role: "user" }).sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());


  return <HomePage usersList={usersList}   />
}
