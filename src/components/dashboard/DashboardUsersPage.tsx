"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { CircleUserRound } from "lucide-react";
import Overview from "./Overview";


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




const DashboardUsersPage = ({ usersList }: DashboardUsersPageProps): JSX.Element => {
  const filteredUsers = usersList.filter((user) => user.role === "user");
  // const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
 const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return (
    <section className="w-full h-full overflow-y-scroll grid grid-cols-1 gap-y-4  lg:gap-4 md:grid-cols-2 lg:grid-cols-7">
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
          <CardTitle>users list</CardTitle>
          <CardDescription>
            Total Users {filteredUsers.length}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <section className=""  >
            {filteredUsers.map((user) => (
              <div key={user.email} className="flex justify-between items-center gap-x-2 my-8 bg-orange-600">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.image || user.name.slice(0, 2)} alt="Avatar" />
                  <AvatarFallback>
                    <CircleUserRound className="w-full h-full" />
                  </AvatarFallback>
                </Avatar>

                <div className=" space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                </div>

                <p className="ml-auto text-xs md:text-sm font-medium">{user.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: '2-digit' })}</p>
              </div>
            ))}
          </section>
        </CardContent>
      </Card>
      {/* </div > */}
    </section>
  )
}

export default DashboardUsersPage