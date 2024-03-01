"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { User, columns } from "./columns";

import { Heading } from "../heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  // console.log(data);

  return (
    <>
    {/* <section className="bg-pink-300 overflow-x-scroll w-full"> */}
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="list of users in database"
          />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/users/new`)}
          >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      
          <ScrollArea>
      <DataTable searchKey="name" columns={columns} data={data} />
          {/* </section> */}
          <ScrollBar orientation="horizontal" />
        </ScrollArea> 

    </>
  );
};