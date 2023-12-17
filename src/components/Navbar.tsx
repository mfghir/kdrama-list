"use client"

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from '@/utilities/ModeToggle';

const Navbar = () => {
    const { status, data: session } = useSession();

    return (
        <section className="flex justify-between items-center bg-blue-600  ">
            <h1 className="text-2xl lg:text-4xl font-semibold">Kdrama List</h1>


            <div className="flex justify-between items-center gap-x-4 flex-wrap md:flex-nowrap">
                <ModeToggle />
                <span className="font-bold">{session?.user?.name}</span>
                {session?.user?.name ?
                    <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>Log out</Button>
                    :
                    <Button asChild><Link href="/register">Register</Link></Button>
                }
            </div>

        </section >
    )
}

export default Navbar