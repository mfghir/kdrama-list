"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form"

import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useToast } from "../ui/use-toast";
import { Input } from "@/components/ui/input"
import SubmitButton from "@/templates/SubmitButton";

import GoogleButton from "../../utilities/GoogleButton";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery } from "@tanstack/react-query";
import { generatePassword } from "@/utilities/ninjas-api";
import { Button } from "../ui/button";
import { Copy, Dices, KeyRound } from "lucide-react";


const formSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters.", }),
  email: z.string()
    .email("This is not a valid email.")
    .min(5, { message: "This field has to be filled." }),
  password: z.string()
    .min(8, { message: 'You must be at least 8 character' })
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(value),
      { message: 'Password must contain at least one letter, one number, and one special character' }
    ),
})



export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setLoading(true);

    try {
      await axios.post("/api/register", values);
      router.push("/login");

      toast({
        variant: "success",
        title: "Success",
        description: "Successfully Registered!"
      });

    } catch (error: any) {
      console.log("error catch - RegisterForm ---->", error)

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    } finally {
      setLoading(false);
    }
  }



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


  const { data: passwordGeneFunc, isLoading, error, refetch } =
    useQuery(['password'], () => generatePassword(), {
      enabled: false
    });

  const handleGeneratePassword = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    refetch();
  };

  const copyHandler = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      variant: "success",
      title: "Copy to clipboard! ✔",
    })
  }

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
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 min-h-screen h-fit p-6 mt-24 lg:mt-0 lg:px-20 lg:pt-28">
        <Image
          className="hidden lg:block lg:w-[550px] m-auto rounded-3xl"
          width={1080}
          height={1080}
          src="https://i.postimg.cc/mgYKr9bj/signup.jpg"
          alt="Sign up illustration" />

        <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col justify-center my-6">
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


              <div className="flex flex-row justify-between items-center" >
                <span className="flex justify-start items-start gap-x-2 text-zinc-500">
                  <KeyRound /> { passwordGeneFunc ? passwordGeneFunc : "Password Generator"}
                </span>

                <span className="flex justify-start items-start gap-x-2" >
                  <Copy
                    className="text-zinc-500 hover:text-blue-500 cursor-pointer transition-all"
                    onClick={() => copyHandler(passwordGeneFunc)} />
                  <Dices
                    className="text-zinc-500 hover:text-blue-500 cursor-pointer transition-all"
                    onClick={() => refetch()} />
                </span>
              </div>

              <SubmitButton loading={loading} />
            </form>
          </Form>

          <div className="flex justify-between items-center gap-x-2 my-6 w-full text-zinc-600">
            <span className="w-full h-[1px] bg-zinc-600"></span>
            <span>or</span>
            <span className="w-full h-[1px] bg-zinc-600"></span>
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






