import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import TabUserEdit from "@/components/dashboard/TabUserEdit";

import BreadCrumb from "@/utilities/breadcrumb";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function Page({ params: { userId } }: PageProps) {
  await connectDB();
  // const user = await User.findOne({ _id: userId });
  const user = await User.findById(userId)

  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Edit", link: "/dashboard/users/edit" },
  ];


  return (
    <div className="flex-1 space-y-4">
      <BreadCrumb items={breadcrumbItems} />
      <TabUserEdit userId={user} />
    </div>
  );
}