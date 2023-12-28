"use client"
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export function EditItem(data:any) {
   const [inpValue, setInpValue] = useState({
    title: "",
    status: ""
  });

  console.log("data.data",data);

  const editHandler =()=>{
  }

  useEffect(() => {
    // table.options?.meta.handleOpenDetailsPanel(id)
    
  }, []);


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
            value={inpValue.title}
            onChange={e => setInpValue({ ...inpValue, title: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
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
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>

  )
}
