"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Column, Row, Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

import KdramaEdit from "@/components/KdramaEdit"
import { z } from "zod"







 const movieSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  genre: z.string(),
})



interface DataTableRowActionsProps<TData> {
  table: Table<TData>
  column: Column<TData>
  row: Row<TData>
  getValue: any
}

export function DataTableRowActions<TData>({
  table,
  column,
  row,
  getValue
}: DataTableRowActionsProps<TData>) {
  const drama = movieSchema.parse(row.original)
  const { toast } = useToast()

  const copyHandler = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copy to clipboard! ✔",
      description: `Drama Name: ${text}`,
    })
  }



  return (
    <>
      {/* <Dialog> */}
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
              >
                Edit
                {/* @ts-ignore  */}
                <KdramaEdit table={table} row={row} column={column} getValue={getValue} />
              </DropdownMenuItem>
            </DialogTrigger>
          </Dialog>



          <DropdownMenuItem onClick={() => copyHandler(drama.title)} >Make a copy</DropdownMenuItem>
          {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}

          <DropdownMenuSeparator />

          {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={drama.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator /> */}

          <DropdownMenuItem
          // onClick={() => deleteUser(drama.id)}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* </Dialog> */}
    </>
  )
}