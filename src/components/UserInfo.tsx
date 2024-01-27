"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardNav from "./dashboard/DashboardNav";
import { ScrollArea } from "./ui/scroll-area";


interface UserInfoProps {
  role: string;
  email: string;
  name: string;
  image: string;
}


export default function UserInfo({
  role,
  email,
  name,
  image,
}: UserInfoProps): JSX.Element | null {

  if (role === "admin") {
    return (
      <>

        <ScrollArea className="h-full mt-8">
          <div className="w-full flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋
            </h2>

            <div className="hidden md:flex items-center gap-x-4">
            {new Date().toLocaleString() + ""}
              <Button>{new Date().toLocaleString("en-US", {year:"numeric", month: "long", day : '2-digit'})}</Button>
            </div>
          </div>


          <div className="flex flex-col gap-2 my-6 w-full md:w-2/4 p-3 rounded-2xl border bg-background/95 backdrop-blur ">
            {image ? <Image src={image} alt="user" width={60} height={60} /> : ""}

            <div>
              Role: <span className="font-bold">{role}</span>
            </div>
            <div>
              Name: <span className="font-bold">{name}</span>
            </div>
            <div>
              Email: <span className="font-bold">{email}</span>
            </div>

            <Button asChild >
              <Link href="/" >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </ScrollArea>
      </>
    );
  }
  else {
    <>
      user
    </>
  }

  return null

}
