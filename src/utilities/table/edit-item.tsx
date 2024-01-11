// "use client"
// // import { getKdramaList } from "@/app/page"
// /* eslint-disable react/no-unescaped-entities */
// import { Button } from "@/components/ui/button"
// import {
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/components/ui/use-toast"
// import { useEditDrama } from "@/lib/mutations"
// import { useQuery } from "@tanstack/react-query"
// import { useEffect, useState } from "react"

// export function EditItem({ row, column, table ,getValue}: {
//   row: any;
//   column: any;
//   table: any;
//   getValue: any
// }): JSX.Element {
//   const { mutate } = useEditDrama()

//   // const {data, error, isFetched}= useQuery({
//   //   queryKey: ["kdramalist"],
//   //   queryFn: getKdramaList
//   // })

//   // console.log("edit item data", data);


//   // console.log("table---", table);
//   const { toast } = useToast() 

//   const initialValue = getValue()
//   const [value, setValue] = useState(initialValue)

//   useEffect(() => {
//     setValue(initialValue)
//   }, [initialValue])

//   const submitHandler = () => {
//     // data.editItem(inpValue,"put");
//     // console.log("value", value);
//     // console.log("column", column);
    
//     table.options.meta?.updateData(row.index, column.id, value)
//     mutate(value);

//     toast({
//       title: "Successfully edited ! ✔",
//       description: `New Name: ${column.title}`,
//     })
//   }

//   // const onBlur = () => {
//   //   table.options.meta?.updateData(row.index, column.id, value)
//   // }

//   // const onBlur = () => {
//   //   if (table && table.options && table.options.meta && typeof table.options.meta.updateData === "function") {
//   //     table.options.meta.updateData(row.index, column.id, value);
//   //     table.forceUpdate();

//   //   } else {
//   //     console.warn('---table.options.meta or updateData function is not defined---');
//   //   }
//   // }

//   return (
//     <DialogContent className="sm:max-w-[425px]">
//       <DialogHeader>
//         <DialogTitle>Edit Drama</DialogTitle>
//         <DialogDescription>
//           Make changes here. Click save when you're done.
//         </DialogDescription>
//       </DialogHeader>

//       <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="title" className="text-right">Title</Label>
//           <Input
//             id="title"
//             // defaultValue={data.data.title}
//             className="col-span-3"
//             name="title"
//             value={value}
//             onChange={e => setValue(e.target.value)}
//             // onBlur={onBlur}
//           // value={inpValue.title}
//           // onChange={e => setInpValue({ ...inpValue, title: e.target.value })}
//           />
//         </div>
//         {/* <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="status" className="text-right">
//             Status
//           </Label>
//           <Input
//             id="status"
//             // defaultValue={data.data.status}
//             className="col-span-3"
//             name='status'
//             value={inpValue.status}
//             onChange={e => setInpValue({ ...inpValue, status: e.target.value })}
//           />
//         </div> */}
//       </div>
//       <DialogFooter>
//         {/* <Button type="submit">Save changes</Button> */}
//         <Button onClick={submitHandler} >Save changes</Button>
//       </DialogFooter>
//     </DialogContent>

//   )
// }










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
// import { toast } from "@/components/ui/use-toast";

export default function KdramaEdit({ row, column, table ,getValue}: {
    row: any;
    column: any;
    table: any;
    getValue: any
  }): JSX.Element {
  const { mutate } = useEditDrama()
  const { toast } = useToast()
console.log("object----",row);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // if (typeof title !== "string" || typeof description !== "string") return;
    // if (typeof title !== "string") return;
    // addTask(title, description);

    console.log("add data22", data);
    mutate(row.id, data);
    toast({
      title: "Successfully edited ! ✔",
      // description: `New Name: ${column.title}`,
    })
  }

  

  return (
    <>
    {/* <Dialog> */}
      {/* <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="mr-3" >
          ＋ Add New Title
        </Button>
      </DialogTrigger> */}

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

    {/* </Dialog> */}
    </>

  );
}
