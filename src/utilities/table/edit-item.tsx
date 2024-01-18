"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditDrama } from "@/lib/mutations";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { labels, genres, statuses } from "@/lib/data";


type SelectOptions = {
  statuses: string;
  labels: string;
  genres: string;
};


export default function KdramaEdit({ row }: { row: any }): JSX.Element {
  const { mutate } = useEditDrama()
  // const { mutate } = useUpdateYourData()
  const { toast } = useToast()
  const [value, setValue] = useState<SelectOptions>({
    statuses: "",
    labels: "",
    genres: ""
  });

  // const changeHandler = (e: { target: { name: string; value: any; } }) => {
  //   let name = e.target.name as keyof SelectOptions;
  //   setValue(prev => ({ ...prev, [name]: e.target.value }))

  // }




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // if (typeof title !== "string" || typeof description !== "string") return;
    // addTask(title, description);

    console.log("edit--->", data);
    console.log("row.original.id--->", row.original.id);
   
  
    mutate({ id: row.original.id, ...data });
    // mutate({
      // id: row.original.id, data:{
      //   title: data.title ? data.title : row.original.title ,
      //   status: data.status ? data.status : row.original.status ,
      //   label: data.label ? data.label : row.original.label ,
      //   genre: data.genre ? data.genre : row.original.genre ,
      // },



      
      // status: data.status ,
      // label: data.label ,
      // genre: data.genre
  // });
    toast({ title: "Successfully edited ! ✔" })
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-3" onClick={()=> console.log("row-->", row.original)}>
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Kdrama</DialogTitle>
          {/* <DialogDescription>
            What do you want to get done today?
          </DialogDescription> */}
        </DialogHeader>
        <form
          id="drama-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              placeholder="Title..."
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              name="status"
              value={value.statuses}
              onValueChange={
                (val) => setValue({ ...value, statuses: val })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent
              >
                {statuses.map((item) =>
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">

            <Select
              name="label"
              value={value.labels}
              onValueChange={
                (val) => setValue({ ...value, labels: val })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a label" />
              </SelectTrigger>
              <SelectContent>
                {labels.map((item) =>
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              name="genre"
              value={value.genres}
              onValueChange={
                (val) => setValue({ ...value, genres: val })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((item) =>
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </form>



        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="drama-form">
              Submit
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
