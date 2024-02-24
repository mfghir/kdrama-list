import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    await connectDB();
    const courses = await User.find();

    return NextResponse.json({ message: "Ok", data: courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Courses", error },
      { status: 500 }
    );
  }
}

export async function POST(request: any) {
  try {
    const userData = await request.json();
    console.log("userData", userData);

    await connectDB();
    await User.create(userData);

    return NextResponse.json(
      { message: "Course created successfully", data: userData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Create a Course", error },
      { status: 500 }
    );
  }
}

// export async function DELETE(request: any,data:any,params: any,context:any) {
//   try {
//     const id = request.nextUrl.searchParams.get("id");
//     // console.log("-id------------------",id);

//     // const idsToDelete = request.nextUrl.searchParams.getAll("ids")
//       // ? request.nextUrl.searchParams.getAll("ids")
//       // : [id];

//       const { userIds } = request.body;

//     console.log("-userIds------------------",userIds);
//     console.log("-context-------------------",context);
//     console.log("-data-------------------",data);
//     console.log("-params-------------------",params);

//     await connectDB();
//      // Delete a single user if the ID is provided
//      if (id) {
//       await User.findByIdAndDelete(id);
//     }

//     // Delete multiple users if the IDs are provided
//     if (userIds && userIds.length > 0) {
//       await User.deleteMany({ _id: { $in: userIds } });
//     }

//     return NextResponse.json(
//       { message: "Course deleted Successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to Delete a Course", error },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: any,
//   // req: NextApiRequest,
//   // res: NextApiResponse
//   res: any
// ) {
//   try {
//     await connectDB();

//     const userData = await req.json();
//     console.log("userData************",userData);
//     console.log("req-------------",req);
//     // Extract user IDs from the request body
//     const { userIds } = req.body;
//     console.log("userIds======", userIds);

//     // // Check if user IDs are provided
//     // if (!userIds || !Array.isArray(userIds)) {
//     //   return res.status(400).json({ message: "Invalid user IDs provided" });
//     // }

//     // Delete users by their IDs
//     await User.deleteMany({ _id: { $in: userIds } });

//     return res.status(200).json({ message: "Users deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting users:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

export async function DELETE(
  req: any,
  res: any,
  context: any
) {
  try {
    await connectDB();
    const id = context.params.userId;

    // console.log("req-------------",req);

    // Extract user IDs from the request body
    // const { userIds } = req.body;
    // console.log("userIds======", userIds);
    console.log("context======", context);

    const { ids } = req.body;
        console.log("ids======", ids);

    if (Array.isArray(ids)) {
      // Delete multiple users
      await User.deleteMany({ _id: { $in: ids } });
    } else {
      // Delete a single user
      await User.findByIdAndDelete(id);
    }

    return NextResponse.json(
      { message: "users deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error deleting users:", error);
    // return res.status(500).json({ message: "Internal server error" });
    return NextResponse.json(
      { message: "Failed to delete users", error },
      { status: 500 }
    );
  }
}
