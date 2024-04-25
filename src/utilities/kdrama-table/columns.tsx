"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { labels, genres, statuses, MovieList } from "@/lib/data"

import { DataTableColumnHeader } from "./DataTableColumnHeader"
import KdramaEdit from "@/components/KdramaEdit"

import KdramaDelete from "@/components/KdramaDelete"
import KdramaCopy from "@/components/KdramaCopy"
// import { DataTableRowActions } from "./DataTableRowActions"




export const columns: ColumnDef<MovieList>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),

  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
          {label && <Badge variant="outline">{label.label}</Badge>}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"))
      if (!status) return null

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genre" />
    ),
    cell: ({ row }) => {
      const genre = genres.find((genre) => genre.value === row.getValue("genre"))
      if (!genre) return null

      return (
        <div className="flex items-center">
          {/* {genre.icon && (
            <genre.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{genre.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row ,column,table, getValue}) => {

  //     // const movies = row.original
  //     // console.log("movies",movies);

  //     // console.log("row",row);
  //     // console.log("column",column);
  //     // console.log("table",table);
  //     return <DataTableRowActions row={row} column={column} table={table} getValue={getValue} />
  //   }
  // },

  {
    id: "edit",
    cell: ({ row }) => {
      return <KdramaEdit row={row} />
    }
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"))
      if (!status) return null

      return <KdramaDelete row={row} />
    }
  },
  {
    id: "copy",
    cell: ({ row }) => {
      return <KdramaCopy row={row} />
    }
  },
  // {
  //   id: "test",
  //   cell: ({ row }) => {
  //     return <span className="opacity-0 md:hidden">tets</span>
  //   }
  // },
]
