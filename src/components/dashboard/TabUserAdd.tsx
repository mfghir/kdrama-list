
"use client"

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Heading } from '@/utilities/heading'
import { Separator } from '../ui/separator'


import { useToast } from "../ui/use-toast";
import FileUpload from "@/utilities/file-upload";
import axios from "axios";




const formSchema = z.object({
  name: z.string().min(3, { message: "Product Name must be at least 3 characters" }),
  imgUrl: z.string().refine((files) => { return files?.[0] }),
  email: z.string()
    .min(5, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string()
    .min(8, { message: "pass must be at least 8 length." }),
  role: z.string().default("user")
});




const TabUserAdd = () => {
  //   console.log(userId);
  const initialData = null
  const router = useRouter();
  const pathName = usePathname()

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const title = pathName.includes('new') ? "Create user" : "Edit user"
  const description = pathName.includes('new') ? "Add a new user" : "Edit a user."
  const toastMessage = initialData ? "user created." : "user updated."
  const action = pathName.includes('new') ? "Create" : "Save changes"



  const storedImgUrl = localStorage.getItem('imgUrl');
  console.log(typeof (storedImgUrl));

  const defaultValues = initialData ? initialData : {
    name: "",
    email: "",
    // imgUrl: [],
    imgUrl: "https://utfs.io/f/f33acdb2-70ff-4fde-9a05-763beb20ec4f-8wans1.jpg" || storedImgUrl,
    password: "",
    role: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });


  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {

    try {
      setLoading(true);

      if (!initialData) {
        // console.log("initialData-=-=-=-=-", initialData);
        await axios.post(`/api/users`, data);
        localStorage.removeItem('imgUrl');

      } else {
        console.log("error ****");
      }

      // await axios.post(`/api/users`, data);
      // console.log("data ****", data);

      router.push(`/dashboard/users`);
      router.refresh();

    } catch (error: any) {
      console.log("error-->", error);

    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading title={title} description={description} />
      </div>
      {/* 
      {initialData && (
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
      <Separator /> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-6">
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload onChange={field.onChange} value={field.value} onRemove={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="role" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit" >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default TabUserAdd




