import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth-options";

import LoginForm from "@/components/forms/LoginForm";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <LoginForm />;
};

export default Login;
