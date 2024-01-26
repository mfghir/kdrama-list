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
    <div className="w-full p-6 lg:px-20 lg:py-8 flex justify-between items-center">
      <section className="wf flex justify-start items-center gap-y-2 gap-x-4 ">
        <Image
          className="w-16 h-16 rounded-full object-fill"
          width={80}
          height={80}
          src="https://i.postimg.cc/rwwCstjZ/kdrama-logo.jpg"
          alt="logo"
        />
        {path === "/dashboard" || path === "/dashboard/users" ?
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
          : null
        }
      </section>

      <section className="flex justify-end gap-y-2 gap-x-4 flex-wrap md:flex-nowrap">
        <div className='flex justify-between items-center gap-x-4'>
          <ModeToggle />
          {session?.user ?
            <UserNav />
            :
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          }
        </div>

        <ThemeSelector />
      </section>
      {/* </nav > */}
    </div>
  )
}

export default Navbar