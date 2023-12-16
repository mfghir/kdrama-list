import UserInfo from "@/components/UserInfo";

export default function Dashboard() {
  return <UserInfo />;
}



// import RegisterForm from "@/components/RegisterForm";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// import { authOptions } from "../api/auth/[...nextauth]/route";

// export default async function Register() {
//     const session = await getServerSession(authOptions);

//     if (session) redirect("/dashboard");

//     return <RegisterForm />;
// }
