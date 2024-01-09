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

// import { useAddUser } from "@/lib/mutations";
// import { useTaskStore } from "@/lib/store";\

export default function KdramaAdd() {
  // const addTask = useTaskStore((state) => state.addTask);

  // const { mutate, data } = useAddUser()
  // console.log("add data", data);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    // const { title } = Object.fromEntries(formData);
    const data = Object.fromEntries(formData);

    // if (typeof title !== "string" || typeof description !== "string") return;
    // if (typeof title !== "string") return;
    // addTask(title, description);

    console.log("add data22", data);
    // mutate(data);

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-3" >
          ＋ Add New Title
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Title</DialogTitle>
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
              id="sort"
              name="sort"
              placeholder="Sort..."
              className="col-span-4"
            />
          </div>
        </form>
        
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              Add Drama
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}