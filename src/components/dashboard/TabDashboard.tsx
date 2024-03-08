"use client";

import { Calendar, Clock, Popcorn, Slice, Smile, Sparkles } from "lucide-react"
import { useKdramasData } from "@/lib/queries";
import Overview from "./Overview";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";

import { Button } from "../ui/button";
import { UserInfo, userNotifs } from "@/lib/data";
import { User } from "@/utilities/users-table/columns";
import { ReactElement, JSXElementConstructor, ReactNode, PromiseLikeOfReactNode, Key, ReactPortal } from "react";



const TabDashboard = ({ role, usersList }: {
  role: string;
  usersList?: User[];
}) => {
  const { data: serverData } = useKdramasData()


  if (role === "admin") {
    return (
      <>
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

        <SecTwo serverData={serverData} />

        <SecThree usersList={usersList} />

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
        {/* </ScrollArea> */}
        {/* </div> */}
      </>
    );
  }

  if (role === "user") {
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

          <SecTwo serverData={serverData} />

          <SecUserNotifs />
        </ScrollArea>
      </>
    )
  }

  return null
}


export default TabDashboard







const SecTwo = ({ serverData }: any) => {
  const fantasy = serverData?.filter((item: { genre: string; }) => item.genre === "fantasy")
  const comedy = serverData?.filter((item: { genre: string; }) => item.genre === "comedy")
  const criminal = serverData?.filter((item: { genre: string; }) => item.genre === "criminal")

  return (
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
  )
}



const SecThree = ({ usersList }: {
  usersList: any
}): JSX.Element => {
  const filteredUsers = usersList?.filter((user:UserInfo) => user.role === "user");

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 min-h-[430px]">

      {/* <section className=" overflow-y-scroll grid grid-cols-1 gap-y-4  lg:gap-4 md:grid-cols-2 lg:grid-cols-7"> */}
      <Card className="col-span-4 h-[430px]">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>


      <Card className="col-span-4 md:col-span-3 h-[430px] overflow-y-scroll">
        <CardHeader>
          <CardTitle>users list</CardTitle>
          <CardDescription>
            Total Users {filteredUsers?.length}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {filteredUsers?.map((user: UserInfo ) => (
            <div key={user.email} className="w-full flex  items-center  gap-x-3 mb-8">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.imgUrl} alt="Avatar" />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col w-full space-y-2">

                <div className="w-full flex justify-between items-center">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs text-muted-foreground break-all">
                    {user.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: '2-digit' })}
                  </p>
                </div>

                <p className="w-full text-sm font-medium">{user.email}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


const SecUserNotifs = (): JSX.Element => {
  return (
    <section className="w-full h-full overflow-y-scroll lg:overflow-auto grid grid-cols-1 gap-y-4  lg:gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>


      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Notifications list</CardTitle>
          <CardDescription>
            Total Notifications {userNotifs?.length}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {userNotifs?.map((item) => (
            <div key={item.title} className="flex justify-between items-center gap-x-2 my-8">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.emoji} {item.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 ">{item.desc}</p>
              </div>

              <p className="ml-auto text-xs md:text-sm font-medium">
                {item.createdAt}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

