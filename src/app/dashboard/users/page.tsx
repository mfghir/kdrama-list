import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TabUsers from '@/components/dashboard/TabUsers';
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

  return (
    <div className="flex-1 space-y-4  md:p-8 pt-6 px-6">
      <BreadCrumb items={breadcrumbItems} />
      <TabUsers data={usersList} />
    </div>
  )
}

export default DashboardUsers