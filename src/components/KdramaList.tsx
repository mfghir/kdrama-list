import { Movie, columns } from '@/utilities/table/columns'
import { DataTable } from '@/utilities/table/data-table'
import React from 'react'


async function getData(): Promise<Movie[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      title: "Adamas",
      status: "Ok",
    },
    {
      id: "2",
      title: "My Name",
      status: "50-50",
    },
    {
      id: "3",
      title: "Alchemy of Souls 1",
      status: "Ok",
    }, {
      id: "4",
      title: "Work Later Drink Now 2",
      status: "Ok",
    }, {
      id: "5",
      title: "Bad Mama",
      status: "Ok",
    }, {
      id: "6",
      title: "Narco Saint",
      status: "Ok",
    }, {
      id: "7",
      title: "Big Mouth",
      status: "Ok",
    }, {
      id: "8",
      title: "Doctor Cha",
      status: "Ok",
    }, {
      id: "9",
      title: "Eve",
      status: "Ok",
    }, {
      id: " 10",
      title: "Glory",
      status: "50-50",
    }, {
      id: " 11",
      title: "Extraordinary Attorney Woo",
      status: "Ok",
    },
  ]
}



const KdramaList = async () => {
  const data = await getData()

  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable columns={columns} data={data} />

    </section>
  )
}

export default KdramaList