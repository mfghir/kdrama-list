import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

// export async function GET(request: any) {
//   try {
//     await connectDB();
//     const courses = await User.find();

//     return NextResponse.json({ message: "Ok", data: courses }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch Courses", error },
//       { status: 500 }
//     );
//   }
// }

// ------------------------------------------------------post 👇---------------

// export async function POST(request: any) {
//   try {
//     const userData = await request.json();
//     console.log("userData", userData);

//     await connectDB();
//     await User.create(userData);

//     return NextResponse.json(
//       { message: "Course created successfully", data: userData },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to Create a Course", error },
//       { status: 500 }
//     );
//   }
// }

// ------------------------------------------------------delete list of users 👇---------------

export async function DELETE(request: any) {
  try {
    await connectDB();
    const ids = request.nextUrl.searchParams.getAll("ids[]");
    await User.deleteMany({ _id: { $in: ids } });

    return NextResponse.json(
      { message: "users deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json(
      { message: "Failed to delete users", error },
      { status: 500 }
    );
  }
}
