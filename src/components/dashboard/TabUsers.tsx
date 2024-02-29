import { UserClient } from '@/utilities/users-table/client'
import { ScrollArea } from '../ui/scroll-area'

const TabUsers = ({ data }: any) => {
  return (
    // <div className="h-full ">
    
    <UserClient data={data} />
    // </div>
  )
}

export default TabUsers