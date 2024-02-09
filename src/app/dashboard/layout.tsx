import Sidebar from "@/components/dashboard/Sidebar"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });

  if (!user) return <h3>No such user found in the database!</h3>;

  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar userInfo={user} />
      <div className="w-full pt-28 p-6">{children}</div>
    </section>
  )
}


export default DashboardLayout