import Sidebar from "@/components/dashboard/Sidebar"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import "@uploadthing/react/styles.css";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });

  if (!user) return <h3>No such user found in the database!</h3>;

  return (
    <section className="flex min-h-screen overflow-hidden ">
      <Sidebar userInfo={user} />
      <div className="w-full h-full mt-24 p-6">{children}</div>
      {/* <div className="w-full h-full mt-24 mb-6 px-6 pt-8 pb-40 md:p-6 md:mb-0 md:mt-14 ">{children}</div> */}
    </section>
  )
}


export default DashboardLayout