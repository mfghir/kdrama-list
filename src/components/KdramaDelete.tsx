import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from './ui/button'
import { useToast } from "./ui/use-toast"
import { useDeleteDrama } from '@/lib/mutations'

import { usePathname } from 'next/navigation'

const KdramaDelete = ({ row }: { row: any }): JSX.Element => {
  const { mutate } = useDeleteDrama()
  const { toast } = useToast()

  const pathname = usePathname()

  const deleteHandler = () => {
    mutate({ id: row.original.id })
    toast({ variant: "success", title: "Successfully deleted ✔" });

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          pathname === "/dashboard/kdrama-list" &&
          <Button variant="destructive" size="sm">Delete</Button>
        }
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='destructive' type="submit" onClick={deleteHandler}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default KdramaDelete

