"use client"

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Heading } from '@/utilities/heading'
import { Separator } from '../ui/separator'


import { useToast } from "../ui/use-toast";
import FileUpload from "@/utilities/file-upload";
import axios from "axios";
import Image from "next/image";




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




const TabUserEdit = ({ userId }: { userId: any }) => {
  console.log(userId);
  const initialData = userId ? userId : null
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

  const defaultValues = initialData ? initialData : {
    name: "",
    email: "",
    imgUrl: "" || userId.imgUrl ,
    password: "",
    role: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
    // : {
    //   name: currentUser.name ,
    //   email: currentUser.email,
    //   imgUrl: [],
    //   role: currentUser.role,
    // }
  });


  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/users/${initialData._id}`, data);
        localStorage.removeItem('imgUrl');
        // toast({
        //   title: "Success!",
        //   description: "User has been edited.",
        // });
      } else {
        // await axios.post(`/api/users`, data);
        const res = await axios.post(`/api/users`, data);
        console.log("product", res);
      }


      router.refresh();
      router.push(`/dashboard/users`);
      router.refresh();

      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      // });

    } catch (error: any) {
      console.log("error-->", error);
      console.error(error.response);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };


  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   console.log('test', values);
  //   // updateContact(values)
  //   try {
  //     const response = await axios.put(`/api/users/${userId}`, values);
  //     console.log("===>", response);
  //     router.push("/dashboard/users");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
  //     router.refresh();
  //     // router.push(`/${params.storeId}/products`);
  //   } catch (error: any) {
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  // const triggerImgUrlValidation = () => form.trigger("imgUrl");






  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading title={title} description={description} />
      </div>
      {/* {initialData && (
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

          <Image
            src={userId?.imgUrl}
            alt="Sample image"
            width={200}
            height={200} 
          />


          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={userId?.name} disabled={loading} {...field} />
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
                    <Input placeholder={userId?.email} disabled={loading} {...field} />
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
                    <Input placeholder={userId?.password} disabled={loading} {...field} />
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
                    <Input placeholder={userId?.role} disabled={loading} {...field} />
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

export default TabUserEdit