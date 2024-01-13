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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditDrama } from "@/lib/mutations";

import { useToast } from "@/components/ui/use-toast";

export default function KdramaEdit({ row }: { row: any }): JSX.Element {
  const { mutate } = useEditDrama()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // if (typeof title !== "string" || typeof description !== "string") return;
    // addTask(title, description);

    mutate({ id: +row.id + 1, ...data });
    toast({ title: "Successfully edited ! ✔" })
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-3" >
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
          id="todo-form"
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
            <Input
              id="status"
              name="status"
              placeholder="Status..."
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="label"
              name="label"
              placeholder="Label..."
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="priority"
              name="priority"
              placeholder="Priority..."
              className="col-span-4"
            />
          </div>
        </form>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              Submit
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
