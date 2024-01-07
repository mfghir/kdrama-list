"use client"

import { Table } from "@tanstack/react-table"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { priorities, statuses } from "@/lib/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

import { DataTableViewOptions } from "./data-table-view-options"
import KdramaAdd from "@/components/KdramaAdd"
import { useSession } from "next-auth/react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const { status, data: session } = useSession();


  return (
    <div className="flex items-center justify-between w-full overflow-x-scroll lg:overflow-x-hidden">
      {/* <section className="w-full flex items-center justify-between  overflow-x-scroll"> */}

      <div className="flex flex-1 items-center space-x-2 ">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
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
      {session?.user && <KdramaAdd />}
      <DataTableViewOptions table={table} />
      {/* </section> */}

    </div>
  )
}