"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Movie = {
    id: string
    title: string
    status: "Definitely" | "Ok" | "50-50" | "Normal" | "Awful"
}

export const columns: ColumnDef<Movie>[] = [
    {
    accessorKey: "title",
      header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
    }},    
    {
        accessorKey: "status",
        header: "Status",
    },

]


// export const columns: ColumnDef<Movie>[] = [
//     {
//       accessorKey: "amount",
//       header: () => <div className="text-right">Amount</div>,
//       cell: ({ row }) => {
//         const amount = parseFloat(row.getValue("amount"))
//         const formatted = new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "USD",
//         }).format(amount)
  
//         return <div className="text-right font-medium">{formatted}</div>
//       },
//     },
//   ]
  
