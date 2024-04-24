import { authOptions } from "@/auth-options";
import TabChangePassword from "@/components/dashboard/TabChangePassword";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import BreadCrumb from "@/utilities/breadcrumb";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";


const page = async () => {

  const breadcrumbItems = [
    { title: "Change Password", link: "/dashboard/change-password " },
  ];


  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <TabChangePassword />
    </>
  )
}

export default page