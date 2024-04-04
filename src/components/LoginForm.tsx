"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleButton from "../utilities/GoogleButton";

import { Button } from "@/components/ui/button"
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

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  email: z.string()
    .email("This is not a valid email.")
    .min(5, { message: "This field has to be filled." }),
  password: z.string()
    .min(8, { message: "pass must be at least 8 length." }),
})



export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,

        redirect: false,
      });
      console.log("res login", res);
      // const res = await axios.post("/api/userExists", {
      //   email: values.email,
      //   password: values.password,
      // }
      // );


      if (res?.error) {
        // if (res?.data.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("error===>", error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }


  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const res = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (res?.error) {
  //       setError("Invalid Credentials");
  //       return;
  //     }

  //     router.replace("dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  return (
    <section className="w-full grid md:grid-cols-2 md:gap-x-6 min-h-screen  p-6 mt-24 lg:px-20 lg:py-8">
      <Image
        className="hidden md:block w-full h-fit rounded-3xl"
        width={480}
        height={650}
        src="https://i.postimg.cc/MKXcmyzx/login-pic.jpg"
        alt="Login illustration" />


      <div className="flex flex-col my-6">
        <h1 className="text-2xl font-bold inline-block w-fit border-b-2 my-4">Login</h1>

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} className="py-4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link className=" text-gray-500 text-xs mt-1 hover:text-blue-500 duration-300" href="/forget-password" >
              forget password?
            </Link>

            <Button type="submit" className="w-full font-semibold">Submit</Button>
          </form>
        </Form>

        <div className="flex justify-between items-center gap-x-2 my-6 w-full">
          <span className="w-full h-[1px] bg-gray-400"></span>
          <span>or</span>
          <span className="w-full h-[1px] bg-gray-400"></span>
        </div>

        <GoogleButton text="Login" />

        <p className="text-sm mt-4">
          Does not have an account?
          <Link className=" text-blue-500 ml-1" href="/register" >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}