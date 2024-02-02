"use client"

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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



const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});

export const IMG_MAX_LIMIT = 1;

const formSchema = z.object({
  name: z.string().min(3, { message: "Product Name must be at least 3 characters" }),
  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: "You can only add up to 1 image" })
    .min(1, { message: "At least one image must be added." }),
  email: z.string().email("Invalid Email Address"),
  role: z.
    string().default("user")
});

type ProductFormValues = z.infer<typeof formSchema>;



const TabUserEdit = ({ usersList }: { usersList: any }) => {
  const params = useParams()
  const currentUser = usersList.filter((user: { _id: string | string[]; }) => user._id == params.userId)[0] || {};
  // console.log(params);
  // console.log(usersList);
  // console.log('current User', currentUser)



  const initialData = null

  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const title = initialData ? "Edit user" : "Create user";
  const description = initialData ? "Edit a user." : "Add a new user";
  const toastMessage = initialData ? "user updated." : "user created.";
  const action = initialData ? "Save changes" : "Create";

  // const defaultValues = initialData
  //   ? initialData
  //   : {
  //     name: "",
  //     email: "",
  //     imgUrl: [],
  //     role: "",
  //   };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      imgUrl: [],
      role: "",
    }
  });

  // const onSubmit = async (data: ProductFormValues) => {
  //   try {
  //     setLoading(true);
  //     if (initialData) {
  //       // await axios.post(`/api/products/edit-product/${initialData._id}`, data);

  //     } else {
  //       // const res = await axios.post(`/api/products/create-product`, data);
  //       // console.log("product", res);
  //     }

  //     router.refresh();
  //     router.push(`/dashboard/users`);
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: "There was a problem with your request.",
  //     });

  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: "There was a problem with your request.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await fetch("/api/register", {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not register user.")
        return res.json()
      })
      .then((data) => {
        console.log(data);
        router.push("/login");
      }).catch((err) => console.log(err.message));
  }

  

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      // router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const triggerImgUrlValidation = () => form.trigger("imgUrl");






  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value || "https://i.postimg.cc/2yg62hWm/notfound.jpg"}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading} {...field} />
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
                    <Input disabled={loading} {...field} />
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
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TabUserEdit