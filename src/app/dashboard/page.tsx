// import  authOptions  from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/connectDB";

import { authOptions } from "@/auth-options";
import {User} from "@/models/user";
import TabDashboard from "@/components/dashboard/TabDashboard";


const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });

  const users = await User.find().sort({ createdAt: -1 })
  const usersList = users.map(user => user.toObject());

  return (
    <TabDashboard
    // @ts-ignore
      role={user.role as string}
      // @ts-ignore
      usersList={usersList!} />
  )
}

export default Dashboard



// import {Cloudinary} from "@cloudinary/url-gen";
// export async function create(formData: FormData) {

//   const cloudinary = new Cloudinary({cloud: {cloudName: 'dadxzqtz5'}});

//   const file = formData.get('image') as File;
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = new Uint8Array(arrayBuffer);
//   await new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream({}, function (error, result) {
//       if (error) {
//         reject(error);
//         return;
//       }
//       resolve(result);
//     })
//     .end(buffer);
//   });
// }