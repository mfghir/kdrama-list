import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import KDramaModel from "@/models/kdrama";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const kdramaList = await KDramaModel.find().sort({ createdAt: -1 });
    // console.log("kdramaList ******",kdramaList);

    // const { email } = await req.json();
    // const user = await User.findOne({ email });
    // const test = await User.findByIdAndUpdate(context.params);

    // const ids = request.nextUrl.searchParams.getAll("ids[]");
    // console.log("test",context.nextUrl.searchParams.getAll() );

    // const posts = await KDramaModel.find()
    //   .populate("author", "_id")
    //   .sort({ createdAt: -1 });

    //   console.log("posts ******",posts);

    // const userPost = await postModel.find({ author: user.id }); //// پست های مروبط به کاربر رو پیدا می کنه : کد بک اند

    ////  کاربر رو پیدا می کنه username  , pic id کاربر داخل دیتای پست نشون میده بهت به وسیله populate
    // const posts = await postModel
    //   .find()
    //   .populate("author", ["username", "pic", "_id"])
    //   .sort({ createdAt: -1 });

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

export async function POST(req: any, res: any) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, status, label, genre }: any = body;

    const session = getServerSession(req);
    console.log("KDrama session******", session);

    if (!session) {
      return NextResponse.json(
        { error: "please enter to your account" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    console.log("KDrama user******", user);

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

    const newKDrama = await KDramaModel.create({
      title,
      status,
      label,
      genre,
      userId: new Types.ObjectId(user._id),
    });
    console.log("newKDrama ******", newKDrama);


    // const kdramaData = await req.json();
    // await KDramaModel.create(kdramaData);

    return NextResponse.json({ message: "drama has added." }, { status: 201 });
  } catch (error) {
    console.log("kdrama route error ****", error);
    return NextResponse.json(
      { message: "An error occurred while adding the kdrama." },
      { status: 404 }
    );
  }
}
