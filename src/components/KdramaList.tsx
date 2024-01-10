"use client"

import { useKdramasData } from '@/lib/queries'
import { columns } from '@/utilities/table/columns'
import { DataTable } from '@/utilities/table/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function KdramaList(){
  // function KdramaList<TData, TValue>({
  // columns,
  // data
// }: DataTableProps<TData, TValue>) {

  const { data } = useKdramasData();
  // console.log("test", data);

  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable
        dataT={data.data}
        columns={columns} />
    </section>
  )
}

export default KdramaList