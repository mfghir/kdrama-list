import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";
import { authOptions } from "@/auth-options";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <LoginForm />;
};

export default Login;
