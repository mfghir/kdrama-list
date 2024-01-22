"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { ModeToggle } from '@/utilities/ModeToggle';
import UserNav from './user-nav';

import ThemeSelector from './theme/ThemeSelector';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center w-full mb-8 ">
      <Image
        className="w-16 h-16 rounded-full object-fill"
        width={80}
        height={80}
        src="https://i.postimg.cc/rwwCstjZ/kdrama-logo.jpg"
        alt="logo"
      />

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
    </nav >
  )
}

export default Navbar