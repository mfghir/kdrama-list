import { Button } from './ui/button'
import { useDeleteDrama } from '@/lib/mutations'

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

const KdramaDelete = ({ row }: { row: any }): JSX.Element => {
  const { mutate } = useDeleteDrama()

  const deleteHandler = () => {
    // console.log("object", row.id );
    // console.log("row---", row );
    // console.log("row---original", row.original.id );


    mutate({ id: row.original.id })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
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

