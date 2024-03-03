"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import axios from 'axios'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

import { UserInfo } from '@/lib/data'
import { AlertModal } from '@/utilities/alert-modal'
import { signOut } from 'next-auth/react'
import { toast } from '../ui/use-toast'
import { Input } from '../ui/input'
import NewPass from '@/utilities/new-pass'


const TabProfile = ({ userInfo }: { userInfo: UserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
 
  const router = useRouter();


  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/users/${userInfo._id}`);
      signOut()

      // signOut({ callbackUrl: "/" })
      setOpen(false)

      toast({
        title: "Success!",
        description: "Your account has been deleted successfully."
      });

    } catch (error) {
      console.error("delete error==>", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <section className="h-full flex flex-col gap-2 my-6 w-full md:w-2/4 p-3 rounded-2xl border bg-background/95 backdrop-blur ">
        <Image src={userInfo.imgUrl || "user pic"} alt="user" width={120} height={120} className='rounded-full' />

        <div className='space-y-3 my-3'>
          <p>
            Role: <span className="font-bold">{userInfo.role}</span>
          </p>
          <p>
            Name: <span className="font-bold">{userInfo.name}</span>
          </p>
          <p>
            Email: <span className="font-bold">{userInfo.email}</span>
          </p>
          <p>
              <NewPass userInfo={userInfo} />
          </p>
        </div>

        <Button variant='destructive' onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </section>
    </>

  )
}

export default TabProfile