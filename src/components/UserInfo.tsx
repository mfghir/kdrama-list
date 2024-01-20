"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function UserInfo() {
  const { status, data: session } = useSession();

  console.log("status", status);

  if (status === "authenticated") {
    return (

        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6 w-full md:w-2/4">

          {session?.user?.image ? <Image src={session?.user?.image} alt="user" width={60} height={60} /> : ""}

          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
          {/* <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
          >
            Log Out
          </button> */}

          <Button asChild>
            <Link href={"/"} >
              <LogOutIcon className="mr-2 h-4 w-4" /> Go to Dashboard
            </Link>
          </Button>
        </div>
 
    );
  }
}
