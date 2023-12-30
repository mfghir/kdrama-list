"use client"
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export function EditItem( row, column, table:any) {
  // const [inpValue, setInpValue] = useState({
  //   title: "",
  //   status: ""
  // });

  // console.log("data.data", data);
  console.log("table---", table.table);

  const submitHandler = () => {
    // data.editItem(inpValue,"put");
    // console.log("inpValue", inpValue);
  }

  // const initialValue = data.data.getValue()
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(value)
  }, [value])

  const onBlur = () => {
    table.table.options.meta?.updateData(row.index, column.id, value)
  }



  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Drama</DialogTitle>
        <DialogDescription>
          Make changes here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">Title</Label>
          <Input
            id="title"
            // defaultValue={data.data.title}
            className="col-span-3"
            name="title"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={onBlur}
            // value={inpValue.title}
            // onChange={e => setInpValue({ ...inpValue, title: e.target.value })}
          />
        </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Input
            id="status"
            // defaultValue={data.data.status}
            className="col-span-3"
            name='status'
            value={inpValue.status}
            onChange={e => setInpValue({ ...inpValue, status: e.target.value })}
          />
        </div> */}
      </div>
      <DialogFooter>
        {/* <Button type="submit">Save changes</Button> */}
        <Button onClick={submitHandler} >Save changes</Button>
      </DialogFooter>
    </DialogContent>

  )
}
