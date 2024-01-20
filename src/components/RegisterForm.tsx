"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";


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
  fullName: z.string()
    .min(4, { message: "This field has to be filled." }),
  email: z.string()
    .min(5, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string()
    .min(8, { message: "pass must be at least 8 length." }),
})



export default function RegisterForm() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const res = await signIn("credentials", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,

        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        // if (res?.url) router.replace("/dashboard");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  // async function onSubmit(values: z.infer<typeof formSchema>) {

  //   e.preventDefault();

  //   if (!values.fullName || !values.email || !values.password) {
  //     setError("All fields are necessary.");
  //     return;
  //   }

  //   try {
  //     const resUserExists = await fetch("api/userExists", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: values.email }),
  //     });

  //     const { user } = await resUserExists.json();

  //     if (user) {
  //       setError("User already exists.");
  //       return;
  //     }

  //     const res = await fetch("api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //       }),
  //     });

  //     if (res.ok) {
  //       const form = e.target;
  //       form.reset();
  //       router.push("/");
  //     } else {
  //       console.log("User registration failed.");
  //     }
  //   } catch (error) {
  //     console.log("Error during registration: ", error);
  //   }
  // };


  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   if (!name || !email || !password) {
  //     setError("All fields are necessary.");
  //     return;
  //   }

  //   try {
  //     const resUserExists = await fetch("api/userExists", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     const { user } = await resUserExists.json();

  //     if (user) {
  //       setError("User already exists.");
  //       return;
  //     }

  //     const res = await fetch("api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //       }),
  //     });

  //     if (res.ok) {
  //       const form = e.target;
  //       form.reset();
  //       router.push("/");
  //     } else {
  //       console.log("User registration failed.");
  //     }
  //   } catch (error) {
  //     console.log("Error during registration: ", error);
  //   }
  // };


  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <>
        {/* <div className="grid place-items-center h-screen">
              <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                  />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                    Register
                  </button>

                  {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                      {error}
                    </div>
                  )}


                  <hr />
                  <button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2"
                    onClick={() => signIn("google")}
                  >
                    SignIn with google
                  </button>

                  <span className="text-sm mt-3 text-right ">
                    Already have an account?
                    <Link className="underline" href={"/login"}>
                      Login
                    </Link>
                  </span>
                </form>
              </div>
            </div> */}
      </>

      <section className="flex flex-col justify-center items-center my-6">

        <Form {...form}  >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="fullName" {...field} />
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
                    <Input placeholder="email" {...field} />
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

        <span className="text-sm mt-3 text-right ">
          Already have an account?
          <Link className="underline" href={"/login"}>
            Login
          </Link>
        </span>
      </section>

    </>
  );
}






