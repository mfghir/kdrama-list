"use client"

import { Table } from "@tanstack/react-table"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { genres, statuses } from "@/lib/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

import { DataTableViewOptions } from "./data-table-view-options"
import KdramaAdd from "@/components/KdramaAdd"
// import { useSession } from "next-auth/react"

import { usePathname } from "next/navigation"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  // const { data: session } = useSession();
  const pathname = usePathname()



  return (
    <>
      {/* <section className="w-auto flex items-center justify-between overflow-x-scroll bg-blue-200"> */}
      <div className="w-fit flex items-center space-x-2 mr-6 md:mr-auto">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {table.getColumn("genre") && (
          <DataTableFacetedFilter
            column={table.getColumn("genre")}
            title="genre"
            options={genres}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="w-fit flex justify-end items-center gap-x-2">
        {pathname === "/dashboard/kdrama-list" && <KdramaAdd />}
        <DataTableViewOptions table={table} />
        {/* <span className="opacity-0 md:hidden">tetssss</span> */}
      </div>
      {/* </section> */}
    </>

  )
}