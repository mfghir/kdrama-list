"use client"

import { DataTable } from '@/utilities/table/data-table'
import { ColumnDef } from '@tanstack/react-table'



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  // data: TData[]
}


// const KdramaList = ({columns ,data})<TData, TValue => {
function KdramaList<TData, TValue>({
  columns,
  // data
}: DataTableProps<TData, TValue>) {



  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable columns={columns} />
    </section>
  )
}

export default KdramaList