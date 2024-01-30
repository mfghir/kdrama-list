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
import Image from "next/image";
import GoogleButton from "../utilities/GoogleButton";

const formSchema = z.object({
  name: z.string()
    .min(4, { message: "This field has to be filled." }),
  email: z.string()
    .min(5, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string()
    .min(8, { message: "pass must be at least 8 length." }),
})



export default function RegisterForm() {
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
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await fetch("/api/register", {
      method: "POST",
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
      }).catch((err) => setError(err.message));
  }


  // async function onSubmit(values: z.infer<typeof formSchema>) {

  //   try {
  //     const res = await signIn("credentials", {
  //       name: values.name,
  //       email: values.email,
  //       password: values.password,

  //       // redirect: false,
  //     });
  //     console.log('res', res);

  //     if (res?.error) {
  //       setError("Invalid Credentials");
  //       // if (res?.url) router.replace("/dashboard");
  //       return;
  //     }

  //     router.replace("dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function onSubmit( e:any ,values: z.infer<typeof formSchema>) {

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
  //         fullName : values.fullName ,
  //         email: values.email ,
  //         password : values.email ,
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
      <section className="w-full grid md:grid-cols-2 md:gap-x-6 min-h-screen p-6 mt-24 lg:px-20 lg:py-8">
        <Image
          className="hidden md:block w-full h-fit rounded-3xl"
          width={480}
          height={650}
          src="https://i.postimg.cc/XqYrh5Ff/signup-pic.jpg"
          alt="Sign up illustration" />

        <div className="flex flex-col my-6">
          <h1 className="text-2xl font-bold inline-block w-fit border-b-2  my-4">Register</h1>

          <Form {...form}  >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="fullName" {...field} className="py-4" />
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

              <Button type="submit" className="w-full font-semibold">Submit</Button>
            </form>
          </Form>

          <div className="flex justify-between items-center gap-x-2 my-6 w-full">
            <span className="w-full h-[1px] bg-gray-400"></span>
            <span>or</span>
            <span className="w-full h-[1px] bg-gray-400"></span>
          </div>

          <GoogleButton text="Sign up" />

          <p className="text-sm mt-4">
            Already have an account?
            <Link className=" text-blue-500 ml-1" href="/login" >
              Login
            </Link>
          </p>
        </div>
      </section>

    </>
  );
}






