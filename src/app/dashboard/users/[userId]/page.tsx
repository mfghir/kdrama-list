import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import TabUserEdit from "@/components/dashboard/TabUserEdit";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function Page({ params: { userId } }: PageProps ,context:any) {
  // const session = getServerSession();

  // console.log("session==============",session);
  // console.log("context==============",context);
  console.log("userId==============",userId);
  // console.log("params==============",params);

  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Create", link: "/dashboard/users/create" },
    { title: "Edit", link: "/dashboard/users/edit" },
  ];

  await connectDB();
  const user = await User.findOne({ _id: userId });

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <TabUserEdit userId={user} />
      </div>
    </ScrollArea>
  );
}