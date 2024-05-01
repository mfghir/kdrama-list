import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/connectDB";

import { authOptions } from "@/auth-options";
import User from "@/models/user";
import TabDashboard from "@/components/dashboard/TabDashboard";


const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });

  const users = await User.find().sort({ createdAt: -1 })
  const usersList = users.map(user => user.toObject());

  return (
    <TabDashboard
      role={user.role as string}
      usersList={JSON.parse(JSON.stringify(usersList))} />
  )
}

export default Dashboard

