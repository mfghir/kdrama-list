import Sidebar from "@/components/dashboard/Sidebar"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        {/* <ScrollArea className="h-full">
      <div className="bg flex-1 space-y-4 p-4 md:p-8 pt-6"> */}
        <main className="w-full pt-28 p-6">{children}</main>
        {/* </div>
      </ScrollArea> */}
      </div>
    </>
  )
}