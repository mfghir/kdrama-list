"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { ModeToggle } from '@/utilities/ModeToggle';
import UserNav from './user-nav';

import ThemeSelector from './theme/ThemeSelector';
import MobileSidebar from './dashboard/MobileSidebar';
import { usePathname } from 'next/navigation';

import { UserInfo } from '@/lib/data';

const Navbar = ({ userInfo }: { userInfo: UserInfo }) => {
  const { data: session ,status  } = useSession();
  const path = usePathname();

  // console.log("session ---->",session)
  // console.log("status ---->",status)


  return (
    <div className="fixed inset-0 top-0 left-0 z-20 h-fit">
      <div className=" px-6 py-3 lg:px-20 flex justify-between items-center supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
        <section className="wf flex justify-start items-center gap-y-2 gap-x-4 ">
          <Link href="/"
            className='pic-anim bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-rl hover:from-cyan-500 hover:to-fuchsia-500'>
            <Image
              className="w-16 h-16 rounded-full object-fill "
              width={70}
              height={70}
              src="https://i.postimg.cc/rwwCstjZ/kdrama-logo.jpg"
              alt="logo"
            />
          </Link>
        </section>

        <section className="flex justify-end items-center gap-y-2 gap-x-4">
          <div className='hidden lg:flex justify-between items-center gap-x-4'>
            <ModeToggle />
            <ThemeSelector />
          </div>

          {/* {path === "/dashboard" || path === "/dashboard/users" || path === "/dashboard/messages"  ? */}
          <div className="lg:hidden">
            <MobileSidebar userInfo={userInfo} />
          </div>
          {/* null */}
          {/* } */}

          {session?.user ? <UserNav userInfo={userInfo} /> :
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          }
        </section>
      </div>
    </div>
  )
}

export default Navbar