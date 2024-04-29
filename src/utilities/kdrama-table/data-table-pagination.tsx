"use client"
import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"
import { AwardIcon, Trash } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { AlertModal } from "../../templates/alert-modal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"




interface DataTablePaginationProps<TData> {
  table: Table<TData>,
  setOpen: boolean
}

export function DataTablePagination<TData>({
  table,
  setOpen
}: DataTablePaginationProps<TData>) {

  // const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  // const router = useRouter();

  // const rowsList = table.getFilteredSelectedRowModel().rows
  // const ids = rowsList.map((item) => item.original._id)


  // const onConfirm = async () => {
  //   try {
  //     setLoading(true);

  //     const requestBody = { ids: ids };
  //     await axios.delete('/api/users', { params: requestBody })
  //     router.refresh();

  //     setOpen(false)

  //   } catch (error) {
  //     console.error("delete error------>", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  return (
    <>
      <div className="w-full flex items-center justify-between px-2 overflow-x-scroll md:overflow-x-hidden">
        <div className="flex justify-between items-center gap-x-4 mr-4">
          <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          {table.getFilteredSelectedRowModel().rows.length ?
            //  @ts-ignore 
            <Button variant="destructive" onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button> : ""}
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value: any) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* <span className="opacity-0 md:hidden">tetssss</span> */}
    </>

  )
}