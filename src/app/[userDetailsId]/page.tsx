import connectDB from "@/lib/connectDB";
import BreadCrumb from "@/utilities/breadcrumb";
import UserDetails from "@/components/UserDetails";

import KDramaModel from "@/models/kdrama";
import User from "@/models/user";

interface PageProps {
	params: {
		userDetailsId: string;
	};
}

export default async function Page({ params: { userDetailsId } }: PageProps) {
	await connectDB();
	const user = await User.findOne({ _id: userDetailsId });
	console.log("userDetailsId user **********", user);

	const kdramaList = await KDramaModel.find({ userId: user._id })
		.select("-userId")
		.sort({ createdAt: -1 });
	console.log("userDetailsId kdramaList **********", kdramaList);


	const breadcrumbItems = [
		{ title: "User Details", link: "/dashboard/user-details" },
	];


	return (
		<div className="flex-1 space-y-4">
			<BreadCrumb items={breadcrumbItems} />
			<UserDetails userDetails={user} kdramaList={kdramaList} />
		</div>
	);
}