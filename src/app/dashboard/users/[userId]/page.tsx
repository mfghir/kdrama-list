import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import TabUserEdit from "@/components/dashboard/TabUserEdit";

import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";


interface PageProps {
  params: {
    userId: string;
  };
}

export default async function Page({ params: { userId } }: PageProps) {

  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Edit", link: "/dashboard/users/edit" },
  ];

  await connectDB();
  const user = await User.findOne({ _id: userId });
  // const strId = String(userId);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadCrumb items={breadcrumbItems} />
        <TabUserEdit userId={user} />
      </div>
    </ScrollArea>
  );
}