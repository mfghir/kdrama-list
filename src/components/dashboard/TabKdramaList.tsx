"use client"

import { DataTable } from "@/utilities/table/data-table"
import { ScrollArea } from "../ui/scroll-area"
import DramaTable from "@/utilities/table/drama-table"

const TabKdramaList = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="w-[100vw] md:w-full">
        {/* <div className="w-[100vw] lg:w-full h-full min-h-screen pt-24 pb-6 px-6 lg:px-20"> */}
        <DataTable />
        {/* <DramaTable /> */}
      </div>
    </ScrollArea>
  )
}
{/* <ScrollArea className="h-full ">
<div className="w-[100vw] md:w-full">
  <DataTable kdramaList={kdramaList} />
</div>
</ScrollArea> 
*/}
export default TabKdramaList