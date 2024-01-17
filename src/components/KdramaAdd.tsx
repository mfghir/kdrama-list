"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useAddDrama } from "@/lib/mutations";
import { useToast } from "./ui/use-toast";
import { labels, genres, statuses } from "@/lib/data";
import { useState } from "react";

type SelectOptions = {
  statuses: string;
  labels: string;
  genres: string;
};


export default function KdramaAdd() {
  const { mutate } = useAddDrama()
  const { toast } = useToast()
  const [value, setValue] = useState<SelectOptions>({
    statuses: "",
    labels: "",
    genres: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // if (typeof title !== "string" || typeof description !== "string") return;
    // if (typeof title !== "string") return;
    // addTask(title, description);

    // console.log("data222 ----->", data);
    mutate(data);
    toast({ title: "Successfully Added ✔" })
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          ＋ Add New Title
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Kdrama</DialogTitle>
          <DialogDescription>
            What do you want to add? 😃
          </DialogDescription>
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
            {/* <Input
              id="status"
              name="status"
              placeholder="Status..."
              className="col-span-4"
            /> */}

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
            {/* <Input
              id="label"
              name="label"
              placeholder="Label..."
              className="col-span-4"
            /> */}
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
            {/* <Input
              id="priority"
              name="priority"
              placeholder="Priority..."
              className="col-span-4"
            /> */}

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
              Add Drama
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}