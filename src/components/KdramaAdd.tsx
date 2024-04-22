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

import axios from "axios";

type SelectOptions = {
  statuses: string;
  labels: string;
  genres: string;
};


const KdramaAdd = () => {
  const { mutate } = useAddDrama()
  const { toast } = useToast()
  const [value, setValue] = useState<SelectOptions>({
    statuses: "",
    labels: "",
    genres: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("data - KdramaAdd ---->", data);

    try {
      // await axios.post(`/api/kdrama`, data);
      mutate(data);

      toast({ variant: "success", title: "Successfully Added ✔" });

    } catch (error) {
      console.error("Error adding data:", error);
      toast({ title: "Error Adding Data", description: "An error occurred while adding data" });
    }





    //  // Check if session, user, and email are available before using
    //  const author = session?.user?.email ?? ''; // Default value if email is undefined
    //  // Add author to the data object
    //  data.author = author;

    // try {
    //   // Send the post request directly with the data object
    //   // await axios.post(`/api/kdrama`, data);
    //   mutate(data);

    //   toast({ title: "Successfully Added ✔" });

    // } catch (error) {
    //   console.error("Error adding data:", error);
    //   toast({ title: "Error Adding Data", description: "An error occurred while adding data" });
    // }
  };


  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
  //   const data = Object.fromEntries(formData);

  //   await fetch("/api/kdrama", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Could not add kdrama.")
  //       toast({ title: "Successfully Added ✔" })
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       // router.push("/login");
  //     }).catch((err) => console.log(err.message));
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="ml-4 md:ml-0" >
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
            <Select
              name="status"
              value={value.statuses}
              onValueChange={(val) => setValue({ ...value, statuses: val })}
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
              Add Drama
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default KdramaAdd 