"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
// import { Checkbox } from "@/components/ui/checkbox";







export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
  };
  export const users: User[] = [
    {
      id: 1,
      name: "Candice Schiner",
      company: "Dell",
      role: "Frontend Developer",
      verified: false,
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      company: "TechCorp",
      role: "Backend Developer",
      verified: true,
      status: "Active",
    },
    {
      id: 3,
      name: "Alice Johnson",
      company: "WebTech",
      role: "UI Designer",
      verified: true,
      status: "Active",
    },
    {
      id: 4,
      name: "David Smith",
      company: "Innovate Inc.",
      role: "Fullstack Developer",
      verified: false,
      status: "Inactive",
    },
    {
      id: 5,
      name: "Emma Wilson",
      company: "TechGuru",
      role: "Product Manager",
      verified: true,
      status: "Active",
    },
    {
      id: 6,
      name: "James Brown",
      company: "CodeGenius",
      role: "QA Engineer",
      verified: false,
      status: "Active",
    },
    {
      id: 7,
      name: "Laura White",
      company: "SoftWorks",
      role: "UX Designer",
      verified: true,
      status: "Active",
    },
    {
      id: 8,
      name: "Michael Lee",
      company: "DevCraft",
      role: "DevOps Engineer",
      verified: false,
      status: "Active",
    },
    {
      id: 9,
      name: "Olivia Green",
      company: "WebSolutions",
      role: "Frontend Developer",
      verified: true,
      status: "Active",
    },
    {
      id: 10,
      name: "Robert Taylor",
      company: "DataTech",
      role: "Data Analyst",
      verified: false,
      status: "Active",
    },
  ];








export const columns: ColumnDef<User>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "company",
    header: "COMPANY",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];