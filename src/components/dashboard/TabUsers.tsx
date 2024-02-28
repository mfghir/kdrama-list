import { UserClient } from '@/utilities/users-table/client'

const TabUsers = ({ data }: any) => {
  return (
    
    <UserClient data={data} />
  )
}

export default TabUsers