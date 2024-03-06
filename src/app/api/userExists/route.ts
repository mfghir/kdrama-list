import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req:any) {
  try {
    await connectDB();
    // const { email } = await req.json();
    // const user = await User.findOne({ email }).select("_id");

    
    const test = await req.json();
    console.log("test: ", test);
    const user = await User.findOne({ _id: test._id }).select("_id");
    console.log("user: ", user);
    
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to checking user", error },
      { status: 500 }
    );
  }
}



