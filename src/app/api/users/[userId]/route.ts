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



// import connectDB from "@/lib/connectDB";
// import User from "@/models/user";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await connectDB();
//     const { email, ...updatedData } = req.body;
//     const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({ user });
//   } catch (error) {
//     console.log("error ===>", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }








import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const { email, ...updatedData } = req.body;
    const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("error ===>", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
