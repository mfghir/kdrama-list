import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import TabUserEdit from "@/components/dashboard/TabUserEdit";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Create", link: "/dashboard/users/create" },
  ];

  await connectDB()
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 }) // Sort by date in descending order
  const usersList = users.map(user => user.toObject());

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <TabUserEdit usersList={usersList} />
      </div>
    </ScrollArea>
  );
}