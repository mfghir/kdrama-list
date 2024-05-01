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

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

  const [showLoader, setShowLoader] = useState(false);

  const { data: passwordGeneFunc, isLoading, error, refetch } =
    useQuery(['password'], () => generatePassword(), {
      enabled: false,
      onSuccess: () => {
        setShowLoader(false);
      },
      onError: () => {
        setShowLoader(false);
      },
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

        <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col items-start justify-start my-6">
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
                {/* <span className="flex justify-start items-start gap-x-2 text-zinc-500">
                  <KeyRound />
                  {passwordGeneFunc ? passwordGeneFunc  : "Password Generator"}
                </span> */}

                <span className="flex justify-start items-start gap-x-2 text-zinc-500">
                  <KeyRound />
                  {showLoader ? (
                    <>
                      {
                        isLoading &&
                        <>
                          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                          <svg className="text-gray-300 animate-spin mr-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16">
                            <path
                              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                              stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                              stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
                            </path>
                          </svg>
                          Loading ...
                        </>
                      }
                    </>

                  ) : (
                    passwordGeneFunc || "Password Generator"
                  )}
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
            <span className="w-full h-[1px] bg-zinc-600" />
            <span>or</span>
            <span className="w-full h-[1px] bg-zinc-600" />
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






