"use client"
import { X } from 'lucide-react'



import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

import { Heading } from '@/utilities/heading'
import FileUpload from "@/utilities/file-upload";
import axios from "axios";
import { UserInfo } from '@/lib/data';


const formSchema = z.object({
  name: z.string().min(3, { message: "Product Name must be at least 3 characters" }),
  imgUrl: z.string().refine((files) => { return files?.[0] }),
  email: z.string()
    .min(5, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string()
    .min(8, { message: "pass must be at least 8 length." }),
  // role: z.string().default("user")
});


// const EditProfile = ({ setEditOpen }: { setEditOpen: boolean }) => {
// 	return (
// 		<>
// 			{/* <X onClick={() => setEditOpen(true)} /> */}


// 		</>
// 	)
// }

// export default EditProfile




const EditProfile = ({ userInfo }: { userInfo: UserInfo }) => {
  console.log("-====userInfo=>>>>>>>", userInfo);
  // console.log("-====userInfo id=>>>>>>>", userInfo._id);

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      imgUrl: "" || userInfo?.imgUrl,
      password: "",
      // role: "",
    }
  });


  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    console.log("data edit", data);
    try {
      setLoading(true);
      // if (initialData) {
      await axios.patch(`/api/users/${userInfo._id}`, data);
      localStorage.removeItem('imgUrl');
      // toast({
      //   title: "Success!",
      //   description: "User has been edited.",
      // });

      // } else {
      // 	// await axios.post(`/api/users`, data);
      // 	const res = await axios.post(`/api/users`, data);
      // 	console.log("product", res);
      // }


      router.refresh();
      router.push(`/dashboard/profile`);

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


  return (
    <>
      <div className="flex items-center justify-between mr-3">
        <Heading title="Edit Profile" description="Edit your Profile" />
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
                  <FileUpload onChange={field.onChange} value={field.value} onRemove={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Image
            src={userInfo?.imgUrl}
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
                    <Input placeholder={userInfo?.name} disabled={loading} {...field} />
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
                    <Input placeholder={userInfo?.email} disabled={loading} {...field} />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="enter new password" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<Input placeholder={userInfo?.role} disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
          </div>

          <Button disabled={loading} className="ml-auto" type="submit" >
            {loading ? "Saving changes..." : "Save changes"}
          </Button>
        </form>
      </Form>
    </>
  )
}


export default EditProfile
