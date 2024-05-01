import EditProfile from '@/components/dashboard/edit-profile'
import BreadCrumb from '@/utilities/breadcrumb'
import connectDB from '@/lib/connectDB';

import User from '@/models/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth-options';


const Page = async () => {
  const session = await getServerSession(authOptions);
  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });


  const breadcrumbItems = [
    { title: "Profile", link: "/dashboard/profile" },
    { title: "Edit Profile", link: "/dashboard/profile/edit-profile" },
  ]

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <EditProfile userInfo={JSON.parse(JSON.stringify(user))} />
    </>
  )
}

export default Page