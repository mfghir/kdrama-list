/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from 'next/image'
import React, { useState } from 'react'

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
import Link from "next/link";

import axios from "axios";
import { useToast } from "../ui/use-toast";



const formSchema = z.object({
  email: z.string()
    .email("This is not a valid email.")
    .min(5, { message: "This field has to be filled." }),
  // password: z.string()
  //   .min(8, { message: "pass must be at least 8 length." }),
})

type ForgotPasswordInputs = {
  email: string;
}


const ForgetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      // password: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>()

  // const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
  //   try {
  //     await axios.post("/api/auth/forget-password", values)
  //     toast({ title: "success", description: "Check your inbox!" });
  //     router.push("/login")
  //   } catch (err) {
  //     console.log("forget password", err)
  //   }
  // }


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const onSubmit = async (data: ForgotPasswordInputs) => {
    console.log("form", form.control)
    console.log("values", values)
    // try {
    //   const response = await fetch('/api/auth/reset-password', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(values),
    //   });

    //   if (!response.ok) {
    //     throw new Error('There was an error sending the reset password email.');
    //   }

    //   // Show success message and possibly redirect
    //   toast({ title: "success", description: "Check your inbox!" });

    // } catch (error: any) {
    //   console.log("forget password ---->", error)
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to send reset password email"
    //   });
    // }
  }

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 min-h-screen h-fit p-6 mt-24 lg:mt-0 lg:px-20 lg:pt-28">
      <Image
        className="hidden lg:block lg:w-[550px] m-auto rounded-3xl"
        width={1080}
        height={1080}
        src="https://i.postimg.cc/7YPZySS3/forget-pass.jpg"
        alt="forget password illustration" />


      <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col justify-center my-6">
        <h1 className="text-2xl font-bold inline-block w-fit border-b-2 ">Forget Password</h1>
        <p className='text-sm text-gray-400 mt-2 mb-8'>Don't worry if you've forgotten your password. Follow our easy password reset process to get back into your account.</p>

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

            <Button type="submit" className="w-full font-semibold text-base text-white transition-all duration-700 bg-gradient-to-r  from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-rl hover:from-cyan-500  hover:to-fuchsia-500 ">
              Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default ForgetPassword