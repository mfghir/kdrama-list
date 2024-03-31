"use client"

import { DataTable } from "@/utilities/table/data-table"
import { ScrollArea } from "../ui/scroll-area"

const TabKdramaList = () => {
  return (
    <ScrollArea className="h-full w-full">
    {/* <div className="w-[100vw] lg:w-full h-full min-h-screen pt-24 pb-6 px-6 lg:px-20"> */}
      <DataTable />
    {/* </div> */}
  </ScrollArea>
  )
}

export default TabKdramaList