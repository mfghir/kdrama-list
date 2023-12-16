import RegisterForm from "@/components/RegisterForm";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// import { authOptions } from "../api/auth/[...nextauth]/route";

export default  function Register() {
    // const session = await getServerSession(authOptions);

    // if (session) redirect("/dashboard");

    return <RegisterForm />;
}