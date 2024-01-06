"use client"

import { getKdramaList } from '@/app/page'
import { DataTable } from '@/utilities/table/data-table'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


// const KdramaList = ({columns ,data})<TData, TValue => {
function KdramaList<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {

  // const {data, error, isFetched}= useQuery({
  //   queryKey: ["kdramalist"],
  //   queryFn: getKdramaList
  // })


  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable dataT={data} columns={columns} />
    </section>
  )
}

export default KdramaList