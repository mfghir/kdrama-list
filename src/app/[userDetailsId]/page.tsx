import connectDB from "@/lib/connectDB";
import BreadCrumb from "@/utilities/breadcrumb";
import UserDetails from "@/components/UserDetails";

import KDramaModel from "@/models/kdrama";
import User from "@/models/user";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageProps {
  params: {
    userDetailsId: string;
  };
}

export default async function Page({ params: { userDetailsId } }: PageProps) {
  await connectDB();
  const user = await User.findOne({ _id: userDetailsId })
  // console.log("userDetailsId  user **********", user);

  const kdramaList = await KDramaModel.find({ userId: userDetailsId })
    .select("-userId")
    .sort({ createdAt: -1 });
  // console.log("userDetailsId kdramaList **********", kdramaList);

  const breadcrumbItems = [
    { title: "User Info", link: "/" },
  ];

  return (
    <ScrollArea className="h-full">
      <section className="w-full h-full min-h-screen pt-28 pb-6 px-6 lg:px-20">
        <BreadCrumb items={breadcrumbItems} />
        
        <div className="w-[calc(100vw-48px)] md:w-full">
          <UserDetails userDetails={user} kdramaList={kdramaList} />
        </div>
      </section>
    </ScrollArea>
  );
}