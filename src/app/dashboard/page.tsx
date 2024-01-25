import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import UserInfo from "@/components/UserInfo";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";


const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user.email });


  return <UserInfo role={user.role} email={user.email} name={user.name} image={user.image} />
}

export default Dashboard


// import RegisterForm from "@/components/RegisterForm";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// import { authOptions } from "../api/auth/[...nextauth]/route";

// export default async function Register() {
//     const session = await getServerSession(authOptions);

//     if (session) redirect("/dashboard");

//     return <RegisterForm />;
// }
