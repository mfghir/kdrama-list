import TabUsers from '@/components/dashboard/TabUsers';
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import BreadCrumb from '@/utilities/breadcrumb';

const DashboardUsers = async () => {
  await connectDB()
  const users = await User.find().sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());


  const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
  // <DashboardUsersPage usersList={usersList} />
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <TabUsers />
    </div>
  )
}

export default DashboardUsers