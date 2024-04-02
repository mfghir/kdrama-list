"use client"

import Image from "next/image"
import { ScrollArea } from "./ui/scroll-area"
import { DataTable } from "@/utilities/table/data-table"
import DramaTable from "@/utilities/table/drama-table"

const UserDetails = ({ userDetails, kdramaList }: any) => {

  // const test = userDetails.map((i:any) =>  JSON.parse(JSON.stringify(i) ))
  // console.log("test test test+++++",test[0].name)
  // console.log("userDetails+++++",userDetails)


  return (
    <>
      {/* <section className="w-full h-full min-h-screen pt-24 pb-6 px-6 lg:px-20"> */}
      <div className="h-full flex items-center gap-4 my-6 w-full ">
        <Image src={userDetails.imgUrl} alt="user" width={80} height={80} className='rounded-full' />

        <div className="flex flex-col gap-y-2">
          <p>
            Name: <span className="font-bold">{userDetails.name}</span>
          </p>
          <p>
            Email: <span className="font-bold">{userDetails.email}</span>
          </p>
        </div>
      </div>



      <ScrollArea className="h-full ">
        <div className="w-[100vw] md:w-full">
        <DataTable kdramaList={kdramaList} />
        {/* <div className="h-full w-full " > */}
        {/* <DramaTable kdramaList={kdramaList} /> */}
        {/* </div> */}
        </div>
      </ScrollArea>
      {/* </section> */}
    </>
  )
}

export default UserDetails