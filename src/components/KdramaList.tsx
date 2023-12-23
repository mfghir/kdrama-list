"use client"
import {  columns } from '@/utilities/table/columns'

import React, { useEffect, useState } from 'react'
import { promises as fs } from "fs"
import path from "path"

import { z } from "zod"
import { DataTable } from '@/utilities/table/data-table'
import { MovieList, movieSchema } from '@/lib/schema'



//  function getData(): Promise<Movie[]> {
// Fetch data from your API here.
const daramaList = [
  {
      id: "1",
      title: "Adamas",
      status: "ok",
      label: "documentation",
      priority: "medium"
  },
  {
      id: "2",
      title: "My Name",
      status: "50-50",
      label: "documentation",
      priority: "medium"
  },
  {
      id: "3",
      title: "Alchemy of Souls 1",
      status: "ok",
      label: "documentation",
      priority: "medium"
  },
  {
      id: "4",
      title: "Alchemy of Souls 2",
      status: "definitely",
      label: "documentation",
      priority: "medium"
  },
  {
      id: "5",
      title: "Bad Mama",
      status: "awful",
      label: "documentation",
      priority: "medium"
  },
  {
      id: "6",
      title: "Narco Saint",
      status: "normal",
      label: "documentation",
      priority: "medium"
  },
  {
      id: "7",
      title: "Big Mouth",
      status: "definitely",
      label: "feature",
      priority: "medium"
  },
  {
      id: "8",
      title: "Doctor Cha",
      status: "awful",
      label: "feature",
      priority: "high"
  },
  {
      id: "9",
      title: "Eve",
      status: "ok",
      label: "documentation",
      priority: "low"
  },
  {
      id: " 10",
      title: "Glory",
      status: "50-50",
      label: "documentation",
      priority: "low"
  },
  {
      id: " 11",
      title: "Extraordinary Attorney Woo",
      status: "definitely",
      label: "bug",
      priority: "high"
  },
  {
    id: " 12",
    title: "Little Woman",
    status: "awful",
    label: "bug",
    priority: "low"
},
{
  id: " 13",
  title: "Bloodhounds",
  status: "normal",
  label: "bug",
  priority: "high"
}
]
// }




// async function getData(): Promise<Movie[]> {


//   const res = await fetch(`app/lib/movie.json`)
//   return (await res.json()) as Movie[]


//   // const data = await fs.readFile(
//   //   path.join(process.cwd(), "app/lib/movie.json")
//   // )

//   // const movies = JSON.parse(res.toString())
//   // return z.array(movieSchema).parse(movies)
// }



const KdramaList = () => {
  // const movies = getData()
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   // fetch(`lib/movie.json`)
  //   //   .then((res) => res.json())
  //   //   .then((data) => { setData(data) })


  //   const loadData = async () => {
  //     const response = await fetch('lib/movie.json');
  //     const res = await response.json();
  //     console.log(res);
  //     setData(res);
  //   };

  //   loadData();
  // }, [])


  return (
    <section className='w-full h-full my-6 lg:my-8'>
      <DataTable columns={columns} data={daramaList} />

    </section>
  )
}

export default KdramaList