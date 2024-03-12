import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route.";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/RegisterForm";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterForm />;
};

export default Register;
