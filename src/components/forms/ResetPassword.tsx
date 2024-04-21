// "use client"
// import React, { useState } from 'react'
// import Link from 'next/link'
// import Button from '../common/Button'
// import Input from '../common/Input'
// import styles from './Auth.module.scss'
// // import { InputError, ResetPasswordProps } from '@/app/types'
// import axios, { AxiosError } from 'axios'
// // import { RESET_PASSWORD_API_URL } from '@/app/contants'
// import { useRouter } from 'next/navigation'
// import ErrorText from '../common/ErrorText'

// import { RESET_PASSWORD_API_URL } from '@/lib'
// import { InputError, ResetPasswordProps } from '@/lib/types'

// const ResetPassword = ({ params }: ResetPasswordProps) => {
//     const router = useRouter()

//     const [data, setData] = useState({
//         password: "",
//         confirmPassword: ""
//     })

//     const [validationError, setValidationError] = useState<InputError>({})
//     const [submitError, setSubmitError] = useState<string>("")
//     const [loading, setLoading] = useState<boolean>(false)

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setData({
//             ...data,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()

//         if (data.password.trim() === "") {
//             setValidationError({ password: "Password is required" })
//         }
//         else if (data.confirmPassword.trim() === "") {
//             setValidationError({ confirmPassword: "Confirm password is required" })
//         }
//         else if (data.password !== data.confirmPassword) {
//             setValidationError({ confirmPassword: "Passwords don't match" })
//         }
//         else if (data.password.length < 6) {
//             setValidationError({ password: "Password should be atleast 6 characters long" })
//         }
//         else {
//             setValidationError({ password: "" })
//             setValidationError({ confirmPassword: "" })

//             try {
//                 setLoading(true)

//                 const apiRes = await axios.post(RESET_PASSWORD_API_URL, {
//                     password: data.password,
//                     resetToken: params.token
//                 })

//                 if (apiRes?.data.success) {
//                     setSubmitError("")
//                     router.push("/")
//                 }
//             } catch (error) {
//                 if (error instanceof AxiosError) {
//                     const errorMsg = error.response?.data?.error
//                     setSubmitError(errorMsg)
//                 }
//             }

//             setLoading(false)
//         }
//     }

//     return (
//         <div className={styles.mainContainer}>
//             <Link className={styles.applogo} href={"/"} >
//                 TechRise
//             </Link>

//             <form
//                 className={`${styles.form} ${styles.forgotPasswordForm}`}
//                 onSubmit={handleResetPassword}
//             >
//                 <h2 className={styles.title}> Reset Password </h2>

//                 <Input
//                     label={"New Password"}
//                     name={"password"}
//                     type={"password"}
//                     onChange={handleInputChange}
//                     error={validationError.password}
//                 />

//                 <Input
//                     label={"Confirm Password"}
//                     name={"confirmPassword"}
//                     type={"password"}
//                     onChange={handleInputChange}
//                     error={validationError.confirmPassword}
//                 />

//                 <Button type={"submit"} loading={loading}>
//                     Reset
//                 </Button>

//                 {
//                     submitError &&
//                     <ErrorText text={submitError} />
//                 }

//             </form>
//         </div>
//     )
// }

// export default ResetPassword















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

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import { useToast } from "../ui/use-toast";
import { updatePassword } from '@/lib/updatePassword'



const formSchema = z.object({
  newPassword: z.string()
    .min(8, { message: 'You must be at least 8 character' })
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(value),
      { message: 'Password must contain at least one letter, one number, and one special character' }
    ),
  confirmPassword: z.string()
    .min(8, { message: 'Password must be at least 6 characters' })
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })



const ResetPassword = ({ params }: { params: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  // const { token } = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    },
  })

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<ForgotPasswordInputs>()

  // const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
  //   try {
  //     await axios.post("/api/auth/forget-password", values)
  //     toast({ title: "success", description: "Check your inbox!" });
  //     router.push("/login")
  //   } catch (err) {
  //     console.log("forget password", err)
  //   }
  // }
  // console.log("token ", token)
  console.log("params ", params)


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("form", form.control)
    console.log("values", values.newPassword)


    try {

      await updatePassword({ newPassword: values.newPassword, token: params.token })
      router.push("/login")


      toast({
        variant: "success",
        title: "success",
        description: "Check your inbox!"
      });

    } catch (error: unknown) {
      console.log("forget password ---->", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset password email"
      });
    }
  }

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 min-h-screen h-fit p-6 mt-24 lg:mt-0 lg:px-20 lg:pt-28">
      <Image
        className="hidden lg:block lg:w-[550px] m-auto rounded-3xl"
        width={1080}
        height={1080}
        src="https://i.postimg.cc/YSwB8kDG/reset-pass.jpg"
        alt="reset password illustration" />

      <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col justify-center my-6">
        <h1 className="text-2xl font-bold inline-block w-fit border-b-2 ">Reset Password</h1>
        <p className='text-sm text-gray-400 mt-2 mb-8'>
          Don't worry if you've forgotten your password.
          Follow our easy password reset process to get back into your account.
        </p>

        <Form {...form}  >
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="new password" {...field} className="py-4" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" {...field} className="py-4" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"
              className="w-full font-semibold text-base text-white transition-all 
                duration-700 bg-gradient-to-r  from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-rl 
              hover:from-cyan-500  hover:to-fuchsia-500 ">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default ResetPassword




