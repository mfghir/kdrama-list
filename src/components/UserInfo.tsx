"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Calendar, Clock, DollarSign, LogOutIcon, Popcorn, Slice, Smile, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardNav from "./dashboard/DashboardNav";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useKdramasData } from "@/lib/queries";
import Overview from "./dashboard/Overview";
import DashboardUsersPage from "./dashboard/TabUsers.tsx";


interface UserInfoProps {
  role: string;
  email: string;
  name: string;
  image?: string;
}


interface User {
  email: string;
  name: string;
  role: string;
  image?: string;
  createdAt: Date;
}

interface DashboardUsersPageProps {
  usersList: User[];
}


export default function UserInfo({ role, email, name, image, usersList }: UserInfoProps & DashboardUsersPageProps): JSX.Element | null {
  const { data: serverData } = useKdramasData()
  console.log("usersList---", usersList);

  const fantasy = serverData?.filter((item) => item.genre === "fantasy")
  const comedy = serverData?.filter((item) => item.genre === "comedy")
  const criminal = serverData?.filter((item) => item.genre === "criminal")


  if (role === "admin") {
    return (
      <>
        <ScrollArea className="h-full ">
          <section className="w-full flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋
            </h2>

            <div className="hidden md:flex items-center gap-x-4">
              <Button className="flex justify-between items-center gap-x-2" variant="secondary">
                <Calendar size={18} />
                {new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: '2-digit' })}
              </Button>
              <Button className="flex justify-between items-center gap-x-2" variant="ghost">
                <Clock size={18} />
                {new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" })}
              </Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Dramas
                </CardTitle>
                <Popcorn />
              </CardHeader>

              <CardContent>
                <span className="text-2xl font-bold">{serverData?.length}</span>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fantasy KDramas
                </CardTitle>
                <Sparkles />
              </CardHeader>

              <CardContent>
                <span className="text-2xl font-bold">{fantasy?.length}</span>
                <p className="text-xs text-muted-foreground">
                  +50% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Comedy KDramas
                </CardTitle>
                <Smile />
              </CardHeader>

              <CardContent>
                <span className="text-2xl font-bold">{comedy?.length}</span>
                <p className="text-xs text-muted-foreground">
                  +70% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Criminal KDramas
                </CardTitle>
                <Slice />
              </CardHeader>

              <CardContent>
                <span className="text-2xl font-bold">{criminal?.length}</span>
                <p className="text-xs text-muted-foreground">
                  +30% from last month
                </p>
              </CardContent>
            </Card>
          </section>

          <DashboardUsersPage usersList={usersList} />

          {/* <section className="flex flex-col gap-2 my-6 w-full md:w-2/4 p-3 rounded-2xl border bg-background/95 backdrop-blur ">
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
          </section> */}
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
