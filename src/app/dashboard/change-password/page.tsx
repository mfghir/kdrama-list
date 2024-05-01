import TabChangePassword from "@/components/dashboard/TabChangePassword";
import BreadCrumb from "@/utilities/breadcrumb";

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