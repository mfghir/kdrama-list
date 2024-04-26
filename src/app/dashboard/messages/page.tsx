import TabMessages from '@/components/dashboard/TabMessages'
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/utilities/breadcrumb";


const Page = () => {
  const breadcrumbItems = [
    { title: "Messages", link: "/dashboard/messages" },
  ];

  return (
    // <ScrollArea className="h-full">
    <div className="flex-1 space-y-4">
      <BreadCrumb items={breadcrumbItems} />
      <TabMessages />
    </div>
    // </ScrollArea>
  )
}

export default Page