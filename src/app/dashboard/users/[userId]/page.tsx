import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import TabUserEdit from "@/components/dashboard/TabUserEdit";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function Page({ params: { userId } }: PageProps) {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Create", link: "/dashboard/users/create" },
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