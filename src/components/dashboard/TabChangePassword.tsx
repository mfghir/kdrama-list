"use client"

import { Heading } from '@/templates/heading'
import React, { useState } from 'react'
import { Button } from '../ui/button'


import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { mailAction } from '@/lib/mailAction'


import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  email: z.string()
    .email("This is not a valid email.")
    .min(5, { message: "This field has to be filled." })
})

const TabChangePassword = () => {


    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: ""
      },
    })
  
  
  
  
  
    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
      // console.log("values", values)
      setLoading(true);
  
      try {
        await mailAction(values)
        router.push("/login")
  
        toast({
          variant: "success",
          title: "Success",
          description: "Check your inbox!"
        });
  
      } catch (error: any) {
        console.log("forget password ---->", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: error
        });
      }
      setLoading(false);
  
    }







  return (
    <div>
   <div className="flex items-center justify-between ">
        <Heading title="Change Password" description="change your password" />
      </div>



      <Form {...form}  >
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} className="py-4" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />


<Button disabled={loading} className="ml-auto" type="submit" >
            {loading ? "Saving changes..." : "Save changes"}
          </Button>

          </form>
        </Form>

    </div>
  )
}

export default TabChangePassword