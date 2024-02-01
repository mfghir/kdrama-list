import TabUsers from '@/components/dashboard/TabUsers';
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import BreadCrumb from '@/utilities/breadcrumb';

const DashboardUsers = async () => {
  await connectDB()
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());

  const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <TabUsers data={usersList} />
    </div>
  )
}

export default DashboardUsers