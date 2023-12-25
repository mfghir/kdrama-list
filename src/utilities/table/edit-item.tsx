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

export function EditItem(data:any ,inpValue:any,setInpValue:any) {
  console.log("data",data.data.title);

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
            defaultValue={data.data.title}
            className="col-span-3"
            name={inpValue.title}
            value={inpValue.title}
            onChange={(e)=> setInpValue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Input
            id="status"
            defaultValue="ok"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>

  )
}
