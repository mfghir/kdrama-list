import TabKdramaList from '@/components/dashboard/TabKdramaList'
import BreadCrumb from '@/utilities/breadcrumb';

const Page = () => {
  const breadcrumbItems = [
    { title: "KDrama List", link: "/dashboard/kdrama-list" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <TabKdramaList />
    </>
  )
}

export default Page