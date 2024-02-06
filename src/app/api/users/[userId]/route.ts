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
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req, context) {
  try {
    await connectDB();
    const id = context.params.userId;
    console.log("id", id);

    const session = await getServerSession({req ,context});
  
    console.log("object,session-------", session);

    // const user = await User.findOneAndUpdate({ email });
    // console.log("object,user", user._id);

    const user = await User.findOne({ email: session.user.email });
    console.log("object,user--------", user._id);

    if (!user) {
      return NextResponse.json({ error: "User not found" },{status:404});
    }

    await user.save();
    return NextResponse.json({ message: "sth went wrong" }, { status: 200 });
  } catch (error) {
    console.log("error ===>", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

// import connectDB from "@/lib/connectDB";
// import User from "@/models/user";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";

// export async function PATCH(req, context) {

//   try {
//     await connectDB();
//     const id = context.params.userId;
//     console.log("id",id);

//     const session = getServerSession({req});
//     console.log('session', session);

//     if (!session) {
//       return NextResponse.json({ error: "لطفا وارد حساب کاربری خود شوید" },{ status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email })
//     console.log("object,user", user);

//     if (!user) {
//       return NextResponse.json({ error: "حساب کاربری یافت نشد" },{ status: 404 });
//     }
//     if (user.role !== "admin") {
//       return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
//     }

//     user.save();

//     return NextResponse.json({ error: "آگهی منتشر شد" }, { status: 200 });

//   } catch (error) {
//     return NextResponse.json(
//       { error: "مشکلی در سرور رخ داده است" },
//       { status: 500 }
//     );
// }
// }
