"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

import { Heading } from '@/templates/heading'
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
  const initialData = null
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const storedImgUrl = localStorage.getItem('imgUrl');

  const defaultValues = initialData ? initialData : {
    name: "",
    email: "",
    imgUrl: storedImgUrl ? storedImgUrl : "https://i.postimg.cc/rpN1DtvM/uer-pic.jpg",
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
        // await axios.post(`/api/users`, data);
        await axios.post(`/api/register`, data);
        localStorage.removeItem('imgUrl');
      } else {
        console.log("error ****");
      }

      router.push(`/dashboard/users`);
      router.refresh();

      toast({
        variant: "success",
        title: "Success!",
        description: "User was successfully added.",
      });
    } catch (error: any) {
      console.log("error-->", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading title="Create user" description="Add a new user" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-6">
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
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
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default TabUserAdd




