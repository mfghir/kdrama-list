import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TabUsers from '@/components/dashboard/TabUsers';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import BreadCrumb from '@/utilities/breadcrumb';
import { getServerSession } from 'next-auth';

const DashboardUsers = async () => {
  await connectDB()
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());

  // await connectDB();
  // const session = await getServerSession(authOptions);
  // const usersList = await User.aggregate([
  //   { $match: { email: session?.user.email } },
  //   {
  //     $lookup: {
  //       from: "users",
  //       foreignField: "userId",
  //       localField: "_id",
  //       as: "user",
  //     },
  //   },
  // ]);



  const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];
  // w-[calc(100vw-48px)]
  return (
    <>
    {/* <ScrollArea className=" h-full"> */}
    {/* <div className="flex flex-col space-y-4 h-auto"> */}

    {/* <div className="flex-1 space-y-4  p-6 md:p-8 pt-8"> */}
    {/* <div className=" min-h-screen h-full w-full"> */}
      <BreadCrumb items={breadcrumbItems} />
      <TabUsers data={usersList} />
      {/* <ScrollBar orientation="horizontal" /> */}
    {/* </div> */}
    {/* </ScrollArea> */}
    </>
  )
}

export default DashboardUsers