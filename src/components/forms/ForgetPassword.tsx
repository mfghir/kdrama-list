// /* eslint-disable react/no-unescaped-entities */
// "use client"

// import Image from 'next/image'
// import React, { useState } from 'react'

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"


// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import axios from "axios";
// import { useToast } from "../ui/use-toast";



// const formSchema = z.object({
//   email: z.string()
//     .email("This is not a valid email.")
//     .min(5, { message: "This field has to be filled." }),
//   // password: z.string()
//   //   .min(8, { message: "pass must be at least 8 length." }),
// })

// type ForgotPasswordInputs = {
//   email: string;
// }


// const ForgetPassword = () => {
//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       // password: "",
//     },
//   })

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ForgotPasswordInputs>()

//   // const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
//   //   try {
//   //     await axios.post("/api/auth/forget-password", values)
//   //     toast({ title: "success", description: "Check your inbox!" });
//   //     router.push("/login")
//   //   } catch (err) {
//   //     console.log("forget password", err)
//   //   }
//   // }


//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     // const onSubmit = async (data: ForgotPasswordInputs) => {
//     console.log("form", form.control)
//     console.log("values", values)
//     // try {
//     //   const response = await fetch('/api/auth/reset-password', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(values),
//     //   });

//     //   if (!response.ok) {
//     //     throw new Error('There was an error sending the reset password email.');
//     //   }

//     //   // Show success message and possibly redirect
//     //   toast({ title: "success", description: "Check your inbox!" });

//     // } catch (error: any) {
//     //   console.log("forget password ---->", error)
//     //   toast({
//     //     variant: "destructive",
//     //     title: "Error",
//     //     description: "Failed to send reset password email"
//     //   });
//     // }
//   }

//   return (
//     <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 min-h-screen h-fit p-6 mt-24 lg:mt-0 lg:px-20 lg:pt-28">
//       <Image
//         className="hidden lg:block lg:w-[550px] m-auto rounded-3xl"
//         width={1080}
//         height={1080}
//         src="https://i.postimg.cc/7YPZySS3/forget-pass.jpg"
//         alt="forget password illustration" />


//       <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col justify-center my-6">
//         <h1 className="text-2xl font-bold inline-block w-fit border-b-2 ">Forget Password</h1>
//         <p className='text-sm text-gray-400 mt-2 mb-8'>Don't worry if you've forgotten your password. Follow our easy password reset process to get back into your account.</p>

//         <Form {...form}  >
//           <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="email" {...field} className="py-4" />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full font-semibold text-base text-white transition-all duration-700 bg-gradient-to-r  from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-rl hover:from-cyan-500  hover:to-fuchsia-500 ">
//               Submit</Button>
//           </form>
//         </Form>
//       </div>
//     </section>
//   )
// }

// export default ForgetPassword


























"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './Auth.module.scss'
import InfoText from './InfoText'
// import { InputError } from '@/app/types'
import axios, { AxiosError } from 'axios'
// import { FORGOT_PASSWORD_API_URL } from '@/app/contants'
import SuccessText from '../common/SuccessText'
import ErrorText from '../common/ErrorText'
import { InputError } from '@/lib/types'
import { FORGOT_PASSWORD_API_URL } from '@/lib'

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("")
    const [validationError, setValidationError] = useState<InputError>({})
    const [submitError, setSubmitError] = useState<string>("")
    const [apiSuccessMsg, setApiSuccessMsg] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validate the input
        if (email.trim() === "") {
            setValidationError({ email: "Email is required" })
        }
        else {
            setValidationError({ email: "" })
            setApiSuccessMsg("")

            try {
                setLoading(true)
                // const apiRes = await axios.post(FORGOT_PASSWORD_API_URL, { email })
                const apiRes = await axios.post("/api/forgot-password", { email })
                console.log("apiRes",apiRes)

                if (apiRes?.data?.success) {
                    setApiSuccessMsg(apiRes?.data.msg)
                    setSubmitError("")
                }

            } catch (error) {
                setApiSuccessMsg("")

                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }

            setLoading(false)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <Link className={styles.applogo} href={"/"} >
                TechRise
            </Link>

            <form
                className={`${styles.form} ${styles.forgotPasswordForm}`}
                onSubmit={handleForgotPassword}
            >
                <h2 className={styles.title}> Forgot Password </h2>

                <Input
                    label={"Email"}
                    name={"email"}
                    onChange={handleInputChange}
                    error={validationError.email}
                />

                <Button
                    type={"submit"}
                    loading={loading}
                >
                    Submit
                </Button>

                {
                    apiSuccessMsg &&
                    <SuccessText text={apiSuccessMsg} />
                }

                <InfoText
                    text={"Go back to"}
                    linkTitle={"Login"}
                    linkHref={"/login"}
                />

                {
                    submitError &&
                    <ErrorText text={submitError} />
                }

            </form>
        </div>
    )
}

export default ForgotPassword