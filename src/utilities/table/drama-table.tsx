"use client"

import { Heading } from '../heading'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import { columns } from './columns'
import { DataTable } from './data-table'

const DramaTable = ({ kdramaList }: any) => {
  const pathname = usePathname()

  return (
    <>
      {pathname === "/dashboard/kdrama-list" &&
        <>
          <Heading
            title={`Dramas ${kdramaList?.length}`}
            description="list of dramas in database"
          />
          <Separator />
        </>
      }
,mjkk

<DataTable  columns={columns} data={kdramaList} />
    </>
  )
}

export default DramaTable