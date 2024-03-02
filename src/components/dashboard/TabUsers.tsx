import { UserClient } from '@/utilities/users-table/client'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const TabUsers = ({ data }: any) => {
  return (
    <>
      {/* <ScrollArea> */}
      <div className="h-full w-full " >

      <UserClient data={data} />


      </div>
      {/* <ScrollBar orientation="horizontal" /> */}
      {/* </ScrollArea> */}
    </>
  )
}

export default TabUsers