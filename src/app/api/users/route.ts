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

export async function DELETE(request: any,data:any,params: any,context:any) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log("-id------------------",id);

    const idsToDelete = request.nextUrl.searchParams.getAll("ids")
      // ? request.nextUrl.searchParams.getAll("ids")
      // : [id];

    // if (!idsToDelete || !idsToDelete.length) {
    //   throw new Error("No valid IDs provided for deletion.");
    // }
    
    // const idsToDelete = data.ids; // Array of IDs of the users to delete

    console.log("-idsToDelete------------------",idsToDelete);
    console.log("-context-------------------",context);
    console.log("-data-------------------",data);
    console.log("-params-------------------",params);

    await connectDB();
     // Delete a single user if the ID is provided
     if (id) {
      await User.findByIdAndDelete(id);
    }

    // Delete multiple users if the IDs are provided
    if (idsToDelete && idsToDelete.length > 0) {
      await User.deleteMany({ _id: { $in: idsToDelete } });
    }



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
