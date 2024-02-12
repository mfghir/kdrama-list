import connectDB from "@/lib/connectDB";
import User from "@/models/user";
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
    console.log("userData",userData);
    
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

export async function DELETE(request: any,data:any,params: any) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log("-id------------------",id);
    // console.log("-request-------------------",request);
    console.log("-data-------------------",data);
    console.log("-params-------------------",params);

    await connectDB();
    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Course deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Delete a Course", error },
      { status: 500 }
    );
  }
}
