"use client"

import { columns } from '@/utilities/table/columns'
import { DataTable } from '@/utilities/table/data-table'

function KdramaList() {

  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable columns={columns} />
    </section>
  )
}

export default KdramaList