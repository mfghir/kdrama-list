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

const Navbar = () => {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <div className="w-full p-3 lg:px-20 flex justify-between items-center fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <section className="wf flex justify-start items-center gap-y-2 gap-x-4 ">
        <Image
          className="w-16 h-16 rounded-full object-fill"
          width={80}
          height={80}
          src="https://i.postimg.cc/rwwCstjZ/kdrama-logo.jpg"
          alt="logo"
        />
      </section>

      <section className="flex justify-end items-center gap-y-2 gap-x-4">
        <div className='hidden lg:flex justify-between items-center gap-x-4'>
          <ModeToggle />
          <ThemeSelector />
        </div>

        {path === "/dashboard" || path === "/dashboard/users" ?
          <div className="lg:hidden">
            <MobileSidebar />
          </div> : null
        }

        {session?.user ? <UserNav /> :
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        }
      </section>
      {/* </nav > */}
    </div>
  )
}

export default Navbar