import connectDB from "@/lib/connectDB";
import BreadCrumb from "@/utilities/breadcrumb";
import UserDetails from "@/components/UserDetails";

import KDramaModel from "@/models/kdrama";
import User from "@/models/user";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Details Page',
}

// interface PageProps {
//   params: {
//     userDetailsId: string;
//   };
// }

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function Page({ params: { userDetailsId } }: any) {
  await connectDB();

  // const user = await User.findById(userDetailsId)
  const user = await User.findOne({ _id: userDetailsId })
  // console.log("userDetailsId  user **********", user);

  const kdramaList = await KDramaModel.find({ userId: userDetailsId })
  // const kdramaList = await KDramaModel.findById({ userId: userDetailsId })
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
          <UserDetails
            // userDetails={user}
            userDetails={JSON.parse(JSON.stringify(user))}
            kdramaList={kdramaList} />
        </div>
      </section>
    </ScrollArea>
  );
}