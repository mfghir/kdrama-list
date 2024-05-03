/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import SubmitButton from '@/templates/SubmitButton'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useState } from 'react'
import { mailAction } from '@/lib/mailAction'
import { MoveLeft } from 'lucide-react'
import axios from 'axios';



const formSchema = z.object({
  email: z.string()
    .email("This is not a valid email.")
    .min(5, { message: "This field has to be filled." })
})


const ForgetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    console.log("values", values)
    setLoading(true);

    try {
      await mailAction(values)
      // await axios.post('/api/mailtrap', values.email);
      router.push("/login")

      toast({
        variant: "success",
        title: "Success",
        description: "Check your inbox!"
      });

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.log("forget password - error ---->", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error
      });
    }
    setLoading(false);

  }

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 min-h-screen h-fit p-6 mt-24 lg:mt-0 lg:px-20 lg:pt-28">
      <Image
        className="hidden lg:block lg:w-[550px] m-auto rounded-3xl"
        width={1080}
        height={1080}
        src="https://i.postimg.cc/7YPZySS3/forget-pass.jpg"
        alt="forget password illustration" />

      <div className="w-full md:w-[350px] mx-auto lg:w-[450px] flex flex-col items-start justify-start my-6 ">
        <Link href="/login"
          className="flex justify-start items-center gap-x-2 text-gray-500 text-xs mb-6 hover:text-blue-500 duration-300"
        >
          <MoveLeft size={16} />
          Back to Login
        </Link>

        <h1 className="text-2xl font-bold inline-block w-fit border-b-2 ">Forget Password</h1>
        <p className='text-sm text-gray-400 mt-2 mb-8'>
          Don't worry if you've forgotten your password.
          Follow our easy password reset process to get back into your account.
        </p>

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


            <SubmitButton loading={loading} />

          </form>
        </Form>
      </div>
    </section>
  )
}

export default ForgetPassword


























// "use client"
// import React, { useState } from 'react'
// import Link from 'next/link'
// import Button from '../common/Button'
// import Input from '../common/Input'
// import styles from './Auth.module.scss'
// import InfoText from './InfoText'
// import axios, { AxiosError } from 'axios'
// import SuccessText from '../common/SuccessText'
// import ErrorText from '../common/ErrorText'
// import { InputError } from '@/lib/types'
// import { FORGOT_PASSWORD_API_URL } from '@/lib'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState<string>("")
//   const [validationError, setValidationError] = useState<InputError>({})
//   const [submitError, setSubmitError] = useState<string>("")

//   const [apiSuccessMsg, setApiSuccessMsg] = useState<string>("")
//   const [loading, setLoading] = useState<boolean>(false)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value)
//   }

//   const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     //validate the input
//     if (email.trim() === "") {
//       setValidationError({ email: "Email is required" })
//     } else {
//       setValidationError({ email: "" })
//       setApiSuccessMsg("")

//       try {
//         setLoading(true)
//         // const apiRes = await axios.post(FORGOT_PASSWORD_API_URL, { email })
//         const apiRes = await axios.post("/api/auth/forgot-password", { email })


//         console.log("apiRes", apiRes)

//         if (apiRes?.data?.success) {
//           setApiSuccessMsg(apiRes?.data.msg)
//           setSubmitError("")
//         }

//       } catch (error) {
//         setApiSuccessMsg("")

//         if (error instanceof AxiosError) {
//           const errorMsg = error.response?.data?.error
//           setSubmitError(errorMsg)
//         }
//       }

//       setLoading(false)
//     }
//   }

//   return (
//     <div className={styles.mainContainer}>

//       <form
//         className={`${styles.form} ${styles.forgotPasswordForm}`}
//         onSubmit={handleForgotPassword}
//       >
//         <h2 className={styles.title}> Forgot Password </h2>

//         <Input
//           label={"Email"}
//           name={"email"}
//           onChange={handleInputChange}
//           error={validationError.email}
//         />

//         <Button
//           type={"submit"}
//           loading={loading}
//         >
//           Submit
//         </Button>

//         {
//           apiSuccessMsg &&
//           <SuccessText text={apiSuccessMsg} />
//         }

//         <InfoText
//           text={"Go back to"}
//           linkTitle={"Login"}
//           linkHref={"/login"}
//         />

//         {
//           submitError &&
//           <ErrorText text={submitError} />
//         }

//       </form>
//     </div>
//   )
// }

// export default ForgotPassword