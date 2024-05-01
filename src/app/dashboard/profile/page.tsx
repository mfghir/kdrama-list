import { authOptions } from '@/auth-options';
import connectDB from '@/lib/connectDB';
import User from '@/models/user';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import TabProfile from '@/components/dashboard/TabProfile'

import BreadCrumb from '@/utilities/breadcrumb';


const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });


  const breadcrumbItems = [
    { title: "Profile", link: "/dashboard/profile" },
  ]

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <TabProfile userInfo={JSON.parse(JSON.stringify(user))} />
    </>
  )
}

export default Page



// const session = await getServerSession(authOptions);
// const userRole = await User.findOne({ email: session?.user?.email });
// console.log("roleAdmin******user",userRole.role);