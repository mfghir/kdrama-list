import { authOptions } from "@/auth-options";
import TabChangePassword from "@/components/dashboard/TabChangePassword";
import BreadCrumb from "@/utilities/breadcrumb";
import { getServerSession } from "next-auth";




const page = async () => {
  const session = await getServerSession(authOptions);
  console.log("session chang pass ***********", session)




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