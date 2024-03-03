"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import  axios  from "axios"
import { UserInfo } from "@/lib/data"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  password: z.string()
    .min(8, { message: "pass must be at least 8 length." }),
})

const NewPass = ({userInfo}:{ userInfo: UserInfo }) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  })

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  // }



  const onSubmit = async (data: z.infer<typeof FormSchema>): Promise<void> => {
    try{
      await axios.patch(`/api/users/${userInfo._id}`, data);
      router.refresh();
      form.reset()
      toast({
        variant: "default",
        title: "ok.",
        description: "your password has been changed",
      });

    } catch (error: any) {
      console.log("error-->", error);
      console.error(error.response);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } 
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Password</FormLabel>
              <FormControl>
                <Input placeholder="new password" {...field} />
              </FormControl>
              <FormDescription>
               {/* {form.getValues().password ? ` your new password id: ${form.getValues().password}` : ""} */}
               {/* {console.log(data)} */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


export default NewPass
