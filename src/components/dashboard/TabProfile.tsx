"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import axios from 'axios'
import { signOut } from 'next-auth/react'
import type { UserInfo } from '@/lib/data'

import { AlertModal } from '@/templates/alert-modal'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

import EditProfile from './edit-profile'
import { Pencil, Trash } from 'lucide-react'
import { Heading } from '@/templates/heading'


const TabProfile = ({ userInfo }: { userInfo: UserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);


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
      console.error("delete error - TabProfile ---->", error);
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

      <div className="flex items-start justify-start ">
        <Heading title="Profile" description="here are your Profile" />
      </div>


      <section className="h-full flex flex-col gap-2 my-6 w-full md:w-2/4 p-3 rounded-2xl border bg-background/95 backdrop-blur ">
        {editOpen ?
          <>
            <EditProfile userInfo={userInfo} />
          </>
          :
          <>
            <div className="flex justify-between items-center">
              {/* @ts-ignore */}
              <Image src={userInfo?.imgUrl} alt="user" width={120} height={120} className='rounded-full' />

              <Link href="/dashboard/profile/edit-profile">
                <Pencil className='hover:text-gray-600 transition' onClick={() => setEditOpen(!editOpen)} />
              </Link>
            </div>

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
            </div>

            <Button variant='destructive' onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </>
        }

      </section>
    </>

  )
}

export default TabProfile