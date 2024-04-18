import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth-options";

import RegisterForm from "@/components/forms/RegisterForm";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterForm />;
};

export default Register;
