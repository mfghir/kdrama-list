import DashboardNav from "@/components/dashboard/DashboardNav"
import Sidebar from "@/components/dashboard/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Include shared UI here e.g. a header or sidebar */}


      <div className="flex h-screen overflow-hidden">
     
     <Sidebar/>

{/* <ScrollArea className="h-full">
      <div className="bg flex-1 space-y-4 p-4 md:p-8 pt-6"> */}
      <main className="w-full pt-16 bg-red-500">{children}</main>
      {/* </div>
      </ScrollArea> */}

      </div>
    </>
  )
}