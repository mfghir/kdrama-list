import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TabProfile from '@/components/dashboard/TabProfile'
import connectDB from '@/lib/connectDB';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async() => {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/register");
  await connectDB()
    const user = await User.findOne({ email: session?.user?.email });


    return <TabProfile userInfo={user} />
}

export default Page