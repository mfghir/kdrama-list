import Image from "next/image"
import { DataTable } from "@/utilities/kdrama-table/data-table"

const UserDetails = ({ userDetails, kdramaList }: any) => {


  return (
    <>
      <section className="w-full h-full">
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

        <div className="h-full w-full">
          <DataTable kdramaList={kdramaList} />
        </div>
      </section>
    </>
  )
}

export default UserDetails