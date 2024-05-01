"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useToast } from "../ui/use-toast";
import GoogleButton from "../../utilities/GoogleButton";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { useState } from "react";
import SubmitButton from "@/templates/SubmitButton";
import axios from "axios";


const formSchema = z.object({
  email: z.string()
    .email("This is not a valid email.")
    .min(5, { message: "This field has to be filled." }),
  password: z.string()
    .min(8, { message: 'You must be at least 8 character' })
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(value),
      { message: 'Password must contain at least one letter, one number, and one special character' }
    ),
})



export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setLoading(true);
    try {
      // const res = 
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      // console.log("res login", res);

      console.log("values", values)

      // await axios.post("/api/login", { email: values.email });
      router.push("/dashboard");

      toast({
        variant: "success",
        title: "Success",
        description: "Welcome back"
      });

      // if (res?.error) {
      //   console.log("error - LoginForm ---->", res.error)
      //   toast({
      //     variant: "destructive",
      //     title: "Uh oh! Something went wrong.",
      //     description: res.error,
      //   });
      // }


      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.log("error catch- LoginForm ---->", error)

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
    setLoading(false);
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
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 min-h-screen h-fit p-6 mt-24 lg:mt-0 lg:px-20 lg:pt-28">
      <Image
        className="hidden lg:block lg:w-[550px] m-auto rounded-3xl"
        width={1080}
        height={1080}
        src="https://i.postimg.cc/v8kJq31c/login.jpg"
        alt="Login illustration" />


      <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col items-start justify-start my-6">
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
            <Link href="/forget-password" className="text-gray-500 text-xs mt-3 hover:text-blue-500 duration-300" >
              forget password?
            </Link>

            <SubmitButton loading={loading} />
          </form>
        </Form>

        <div className="flex justify-between items-center gap-x-2 my-6 w-full  text-zinc-600">
          <span className="w-full h-[1px] bg-zinc-600" />
          <span>or</span>
          <span className="w-full h-[1px] bg-zinc-600" />
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