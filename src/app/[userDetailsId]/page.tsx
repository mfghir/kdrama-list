import connectDB from "@/lib/connectDB";
import BreadCrumb from "@/utilities/breadcrumb";
import UserDetails from "@/components/UserDetails";

import KDramaModel from "@/models/kdrama";
import User from "@/models/user";

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
    <section className="w-full h-full min-h-screen pt-28 pb-6 px-6 lg:px-20">
      <BreadCrumb items={breadcrumbItems} />
      <UserDetails userDetails={user} kdramaList={kdramaList} />
    </section>
  );
}