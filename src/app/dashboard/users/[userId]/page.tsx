// import BreadCrumb from "@/components/breadcrumb";
// import { ProductForm } from "@/components/forms/product-form";
import TabUserEdit from "@/components/dashboard/TabUserEdit";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Create", link: "/dashboard/users/create" },
  ];

  const session = await getServerSession();
//   const userID = session?.user;
  console.log("userID",session);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <TabUserEdit />
      </div>
    </ScrollArea>
  );
}