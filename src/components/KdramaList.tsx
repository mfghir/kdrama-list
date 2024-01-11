"use client"

import { useKdramasData } from '@/lib/queries'
import { columns } from '@/utilities/table/columns'
import { DataTable } from '@/utilities/table/data-table'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { useMemo } from 'react'

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
// }

function KdramaList(){
  // function KdramaList<TData, TValue>({
  // columns,
  // data
// }: DataTableProps<TData, TValue>) {

  // const { data } = useKdramasData();
  // console.log("test", data);


  // const { data: serverData } = useQuery({
  //   queryKey: ["kdrama"],
  //   queryFn: async () => {
  //     const result = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/kdrama`);
  //     return result.data;
  //   },
  // });

  // const data = useMemo(() => serverData ?? [], [serverData]);

  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable
        // dataT={data}
        columns={columns} />
    </section>
  )
}

export default KdramaList