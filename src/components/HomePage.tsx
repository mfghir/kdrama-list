"use client"

import KdramaList from './KdramaList'
import Link from 'next/link'
import { Button } from './ui/button'

const HomePage = () => {


    return (
        <>
        <div className="flex justify-between items-center flex-row w-full h-10">
            <h1 className="text-2xl lg:text-4xl font-semibold">Kdrama List</h1>
            <Link href="/register"><Button >Register</Button></Link>
        </div>

            {/* <LoginForm /> */}
            <KdramaList />
        </>
    )
}

export default HomePage