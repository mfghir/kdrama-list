import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

import bcrypt from "bcryptjs";

// export async function GET(request: any, { params: { id } }: any) {
//   try {
//     await connectDB();
//     const course = await User.findOne({ _id: id });

//     return NextResponse.json({ message: "Ok", data: course }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch Users", error },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: any) {
  try {
    const userData = await request.json();
    console.log("User Data :>> ", userData);

    await connectDB();
    await User.create(userData);

    return NextResponse.json(
      { message: "user added successfully", data: userData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add a user", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: any, context: any) {
  try {
    const userData = await request?.json();
    // const hashedPassword = await bcrypt.hash(userData.password, 10);

    // userData.password = hashedPassword;
    await connectDB();
    await User.findByIdAndUpdate(context.params.userId, userData);

    return NextResponse.json(
      { message: "user Updated successfully", data: userData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Updated a User", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: any, context: any) {
  try {
    await connectDB();
    const id = context.params.userId;
    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "user deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Delete a Course", error },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: any, context: any) {
//   try {
//     await connectDB();
//     const id = context.params.userId;

//     console.log("id--********************", id[0]);
//     console.log("context--********************", context);

//     // Extract user IDs from the request body
//     // const { userIds } = req.body;
//     // console.log("userIds======", userIds);
//     // console.log("context======", context);

//     const { ids } = req.body;
//     console.log("ids--***********", ids);

//     if(id) {
//       // Delete a single user
//       await User.findByIdAndDelete(id[0]);
//     }

//     // if (Array.isArray(ids)) {
//     //   // Delete multiple users
//     //   await User.deleteMany({ _id: { $in: [ids] } });
//     // }
//     // else {
//       // Delete a single user
//     //   await User.findByIdAndDelete(id);
//     // }

//     return NextResponse.json(
//       { message: "users deleted successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error deleting users:", error);
//     // return res.status(500).json({ message: "Internal server error" });
//     return NextResponse.json(
//       { message: "Failed to delete users", error },
//       { status: 500 }
//     );
//   }
// }
