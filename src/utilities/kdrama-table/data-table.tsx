"use client"

import { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "./data-table-pagination"

import {
  ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useMemo } from 'react'
import { useKdramasData } from "@/lib/queries"
import { columns } from '@/utilities/kdrama-table/columns'

import { useToast } from "@/components/ui/use-toast"
import { Heading } from "../../templates/heading"



// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function DataTable<TValue>({ kdramaList }: any) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { toast } = useToast()

  // const copyHandler = (text: string) => {
  //   navigator.clipboard.writeText(text)
  //   toast({
  //     title: "Copy to clipboard! ✔",
  //     description: `Drama Name: ${text}`,
  //   })
  // }



  const { data: serverData } = useKdramasData()
  // const data = useMemo(() => serverData ?? [], [serverData]);
  const data = useMemo(() => {
    return kdramaList ? kdramaList : serverData ? serverData : [];
  }, [serverData, kdramaList]);

  const table = useReactTable({
    data,
    //  @ts-ignore 
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })


  return (
    <>
      <div className="my-3">
        <Heading
          title={`Kdramas (${data.length})`}
          description="list of kdramas in database"
        />
      </div>

      <div className="w-auto flex items-center justify-between py-4 overflow-x-scroll md:overflow-x-hidden">
        <DataTableToolbar table={table} />
      </div>

      <div className="rounded-md border h-[calc(82vh-220px)] overflow-scroll md:overflow-x-hidden">
        <Table className="relative ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                // onClick={() => copyHandler(row.original.title)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="w-auto flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} setOpen={false} />
      </div>
    </>
  )
}
