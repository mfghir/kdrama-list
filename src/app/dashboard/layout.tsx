import Sidebar from "@/components/dashboard/Sidebar"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth-options";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import { ScrollArea } from "@/components/ui/scroll-area";
import "@uploadthing/react/styles.css";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });

  if (!user) return <h3>No such user found in the database!</h3>;

  return (
    <>
      <ScrollArea className="h-full">
        <div className="w-full h-fit md:flex justify-between ">
          {/* @ts-ignore  */}
          <Sidebar userInfo={JSON.parse(JSON.stringify(user))} />
          <main className="w-[100dvw] lg:w-full min-h-screen h-full px-6 md:px-8 lg:px-10 pt-28 md:pt-32 mb-8">{children}</main>
        </div>
      </ScrollArea>
    </>
  )
}


export default DashboardLayout
