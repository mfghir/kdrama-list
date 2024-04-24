/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useState } from 'react'

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
import SubmitButton from '@/templates/SubmitButton'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { updatePassword } from '@/lib/updatePassword'

interface InputError {
  [key: string]: string;
}

interface ResetPasswordProps {
  params: {
    token: string
  }
}

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



const ResetPassword = ({ params }: ResetPasswordProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // const { token } = useParams()
  // console.log("token ", token)

  // console.log("params ", params)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    },
  })




  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      await updatePassword({ newPassword: values.newPassword, token: params.token })
      router.push("/login")

      toast({
        variant: "success",
        title: "Success",
        description: "Your password successfully changed!"
      });

    } catch (error: any) {
      console.log("forget password ---->", error)
      toast({
        variant: "destructive",
        title: "Error",
        // description: "Failed to send reset password email"
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

            <SubmitButton loading={loading} />

          </form>
        </Form>
      </div>
    </section>
  )
}

export default ResetPassword




