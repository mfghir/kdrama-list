import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TabProfile from '@/components/dashboard/TabProfile'
import connectDB from '@/lib/connectDB';
import User from '@/models/user';
import BreadCrumb from '@/utilities/breadcrumb';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");
  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });


  const breadcrumbItems = [
    { title: "profile", link: "/dashboard/profile" },
  ]

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <TabProfile userInfo={user} />
    </>
  )
}

export default Page



// const session = await getServerSession(authOptions);
// const userRole = await User.findOne({ email: session?.user?.email });
// console.log("roleAdmin******user",userRole.role);