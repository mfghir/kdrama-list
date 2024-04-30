import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth-options";

import RegisterForm from "@/components/forms/RegisterForm";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: 'Register',
}


const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterForm />;
};

export default Register;
