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
        {/* <div className="shadow-lg px-4 py-6 bg-zinc-300/10 flex flex-col gap-2 my-6 w-full md:w-2/4 rounded-2xl">
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
        </div> */}

        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Hi, Welcome back 👋
              </h2>
              <div className="hidden md:flex items-center space-x-2">
                CalendarDateRangePicker
                <Button>Download</Button>
              </div>
            </div>
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
