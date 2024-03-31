import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

import connectDB from "@/lib/connectDB";
import KDramaModel from "@/models/kdrama";
import User from "@/models/user";

import { Types } from "mongoose";
import { authOptions } from "@/auth-options";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    // console.log("GET session******", session);

    const user = await User.findOne({ email: session?.user?.email });
    // console.log("user ******", user._id);

    const kdramaList = await KDramaModel.find({ userId: user._id })
      .select("-userId")
      .sort({ createdAt: -1 });
    // console.log("kdramaList ******", kdramaList);

    return NextResponse.json(
      { message: "Ok", data: kdramaList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Courses", error },
      { status: 500 }
    );
  }
}

export async function POST(req: any) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, status, label, genre }: any = body;

    const session = await getServerSession(authOptions);
    // console.log("POST KDrama session******", session);

    if (!session) {
      return NextResponse.json(
        { error: "please enter to your account" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    // console.log("POST KDrama user******", user);

    if (!user) {
      return NextResponse.json(
        { error: "this account can not be found" },
        { status: 404 }
      );
    }

    if (!title || !status || !label || !genre) {
      return NextResponse.json(
        { error: "please fill all the fields" },
        { status: 400 }
      );
    }

    // const newKDrama =
    await KDramaModel.create({
      title,
      status,
      label,
      genre,
      userId: new Types.ObjectId(user._id),
    });
    // console.log("POST newKDrama ******", newKDrama);

    return NextResponse.json({ message: "drama has added." }, { status: 201 });
  } catch (error) {
    console.log("kdrama route error ****", error);
    return NextResponse.json(
      { message: "An error occurred while adding the kdrama." },
      { status: 404 }
    );
  }
}
