import DashboardUsersPage from '@/components/dashboard/DashboardUsersPage'
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

const DashboardUsers = async () => {
  await connectDB()
  const users = await User.find().sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());

  return (
    <DashboardUsersPage usersList={usersList} />
  )
}

export default DashboardUsers