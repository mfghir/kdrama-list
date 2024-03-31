import TabKdramaList from '@/components/dashboard/TabKdramaList'
import BreadCrumb from '@/utilities/breadcrumb';

const Page = () => {

	const breadcrumbItems = [
		{ title: "KDrama List", link: "/dashboard/kdrama-list" },
	];


	return (
		<>
      {/* <div className="flex-1 space-y-4"> */}

			<BreadCrumb items={breadcrumbItems} />
			<TabKdramaList />
			{/* </div> */}
		</>
	)
}

export default Page