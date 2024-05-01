import { UserClient } from '@/utilities/users-table/client'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const TabUsers = ({ data }: any) => {
  return (
    <div className="h-full w-full">
      <UserClient data={data} />
    </div>
  )
}

export default TabUsers