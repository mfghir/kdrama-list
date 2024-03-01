import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import TabDashboard from "@/components/dashboard/TabDashboard";

import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");

  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });
  const users = await User.find().sort({ createdAt: -1 })
  const usersList = users.map(user => user.toObject());



  return (
    <>
      {/* // <div className="flex-1 space-y-4 p-4 md:p-8 pt-6"> */}

      <TabDashboard
        role={user.role}
        email={user.email}
        name={user.name}
        image={user.image}
        usersList={usersList} />
      {/* // </div> */}
    </>

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