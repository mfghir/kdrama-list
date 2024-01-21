"use client"

import { signIn } from "next-auth/react";
import Image from 'next/image';


const GoogleButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-gray-300 text-gray-800 font-semibold flex justify-center items-center gap-x-4 px-4 py-3 rounded-lg w-full"
    >
      <Image
        src="google.svg"
        alt="Google Sign In Button"
        width={24}
        height={24}
      />
      Sign in with google
    </button>
  )
}

export default GoogleButton