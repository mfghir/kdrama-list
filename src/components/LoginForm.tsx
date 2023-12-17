"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

const formSchema = z.object({
  email: z.string()
    .min(5, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(8, {
    message: "pass must be at least 8 length.",
  }),
})



export default function LoginForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,

        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
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
    <section className="flex flex-col justify-center items-center my-6">
     
      <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field}  />
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
                  <Input placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" >Submit</Button>
        </form>
      </Form>

      

      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-4 py-3 rounded-lg mt-6"
      >
        Sign in with google
      </button>

    </section>
  );
}