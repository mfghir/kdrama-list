import Image from 'next/image'
import React from 'react'

const ForgetPassword = () => {
  return (
    <section className="w-full grid md:grid-cols-2 md:gap-x-6 min-h-screen  p-6 mt-24 lg:px-20 lg:py-8">
      <Image
        className="hidden md:block w-full h-fit rounded-3xl"
        width={480}
        height={650}
        src="https://i.postimg.cc/MKXcmyzx/login-pic.jpg"
        alt="Login illustration" />


      <div className="flex flex-col my-6">
        <h1 className="text-2xl font-bold inline-block w-fit border-b-2 my-4">Forget Password</h1>
      </div>
    </section>
  )
}

export default ForgetPassword