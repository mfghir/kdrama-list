"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { User, columns } from "./columns";

import { Heading } from "../../templates/heading";

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  // console.log(data);

  return (
    <>
      <div className="flex items-start justify-between my-3">
        <Heading
          title={`Users (${data.length})`}
          description="list of users in database"
        />
        <Button className="text-xs md:text-sm" onClick={() => router.push(`/dashboard/users/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};