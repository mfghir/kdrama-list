"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
// import { Checkbox } from "@/components/ui/checkbox";



export type User = {
  _id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};



export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imgUrl",
    header: "IMG",
    cell: ({ row }) => {
      return <Image src={row.original.imgUrl} alt="Sample image" width={40} height={40} className="rounded-full" />

      //       <Avatar>
      //   <AvatarImage src="https://github.com/shadcn.png" />
      //   <AvatarFallback>CN</AvatarFallback>
      // </Avatar>

    }
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "createdAt",
    header: "Register",
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: '2-digit' })
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];