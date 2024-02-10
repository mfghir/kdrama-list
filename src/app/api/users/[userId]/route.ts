import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: any, { params: { id } }: any) {
  try {
    await connectDB();
    const course = await User.findOne({ _id: id });

    return NextResponse.json({ message: "Ok", data: course }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Courses", error },
      { status: 500 }
    );
  }
}

//Update/EDITING a Course
export async function PUT(request: any, context: any) {
  try {
    const userData = await request?.json();

    await connectDB();
    await User.findByIdAndUpdate(context.params.userId, userData);

    return NextResponse.json(
      { message: "Course Updated successfully", data: userData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Create a Course", error },
      { status: 500 }
    );
  }
}
