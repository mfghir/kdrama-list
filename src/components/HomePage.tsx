"use client"

import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'

const HomePage = ({ usersList }: any) => {
  // console.log("test" , test);


  return (
    <ScrollArea className="h-full ">
      <div className="w-[100vw] lg:w-full h-full min-h-screen pt-28 pb-6 px-6 lg:px-20">

        <p className='my-6' >Welcome to the Kdrama List app</p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-11">
          {usersList.map((item: any) => (
            <div key={item.name} className="group relative ">

              <div className="group before:hover:scale-95 min-w-80 w-full before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl  from-fuchsia-500 to-cyan-500 before:absolute before:top-0  h-72 relative bg-zinc-800 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
                <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500 overflow-hidden">
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
                  <span className="text-2xl font-semibold">{item.name}</span>
                  <p>{item.email}</p>
                </div>

                <Link href={`/${item._id}`}
                  className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500">
                  See More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

export default HomePage