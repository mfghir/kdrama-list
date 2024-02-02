// import { NextApiRequest, NextApiResponse } from 'next';
// import { ObjectId } from 'mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PATCH') {
//     try {
//       const { id } = req.query;
//       const { name, email } = req.body; // Assuming you receive these fields

//       // Validate input using Zod
//       const userDTO = UserDTO.convertFromEntity({ name, email });

//       // Update user in MongoDB
//       await userService.updateUser(id, userDTO);

//       res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }





import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req: { json: () => PromiseLike<{ email: any; }> | { email: any; }; }) {
  try {
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

