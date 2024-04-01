import connectDB from "@/lib/connectDB";
import BreadCrumb from "@/utilities/breadcrumb";
import UserDetails from "@/components/UserDetails";

import KDramaModel from "@/models/kdrama";
import User from "@/models/user";
import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";

interface PageProps {
  params: {
    userDetailsId: string;
  };
}

export default async function Page({ params: { userDetailsId } }: PageProps) {
  await connectDB();
  const user = await User.findOne({ _id: userDetailsId })
  // console.log("userDetailsId  user **********", user);

  const session = await getServerSession(authOptions);
  // console.log("GET session******", session);


  // const kdramaList = await KDramaModel.find({ userId: user._id })
  // 	.select("-userId")
  // 	.sort({ createdAt: -1 });
  // console.log("userDetailsId kdramaList **********", kdramaList);

  const userr = await User.aggregate([
    { $match: { email: session?.user?.email } },
    {
      $lookup: {
        from: "kdramamodels",
        foreignField: "userId",
        localField: "_id",
        as: "kdrama",
      },
    },
  ]);
  console.log("userDetailsId userr **********", userr);

  const test = userr.map(i=> JSON.parse(JSON.stringify(i)) )
  console.log("userDetailsId test test **********", test[0]);


  // const test = await User.findOne({ email: session?.user?.email })
  // .populate({
  //   path: 'Kdrama',
  //   model: 'kdrama',
  //   options: { lean: true },
  // })
  // .exec();
  // console.log("userDetailsId test", test);


  const breadcrumbItems = [
    { title: "User Details", link: "/dashboard/user-details" },
  ];


  return (
    <div className="flex-1 space-y-4">
      <BreadCrumb items={breadcrumbItems} />
      <UserDetails userDetails={user}
      // kdramaList={kdramaList} 
      />
    </div>
  );
}