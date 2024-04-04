"use client"

import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Footer from './Footer'

const HomePage = ({ usersList }: any) => {
  // console.log("test" , test);


  return (
    <>
      <section className="w-full h-full min-h-screen pt-28 pb-6 px-6 lg:px-20">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
          <p className='my-6' >Welcome to the Kdrama List app</p>
          <Image
            src="https://i.postimg.cc/rwwCstjZ/kdrama-logo.jpg"
            alt="header pic"
            width={550}
            height={550}
            className="h-full w-full object-cover object-center rounded-full"
          />
        </div> */}

        <section className='mb-12 flex justify-center items-center flex-col relative'>
          <div className=" w-full
                bg-[url('https://i.postimg.cc/NjwS7txJ/Design.gif')] rounded-3xl
                bg-no-repeat bg-center bg-cover brightness-50 min-h-[calc(100vh-120px)]">
          </div>

          <div className="absolute flex justify-center items-center flex-col gap-y-4">
            <p className="text-7xl font-bold mx-auto z-10">KDrama</p>
            <p className="text-lg lg:text-3xl mx-auto z-10">Welcome to the world of kdrama fans</p>

            <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">

              Lets Go</Button>
          </div>
        </section>


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

                <Link href={`/${item._id}`} className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500">
                  See More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </section>
    </>

  )
}

export default HomePage