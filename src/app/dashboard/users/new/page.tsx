import TabUserAdd from '@/components/dashboard/TabUserAdd'
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";

const page = () => {

  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Create", link: "/dashboard/users/create" },
    // { title: "Edit", link: "/dashboard/users/edit" },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <TabUserAdd />
      </div>
    </ScrollArea>
  )
}

export default page