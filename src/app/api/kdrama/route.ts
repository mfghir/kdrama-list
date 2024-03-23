import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import KDramaModel from "@/models/kdrama";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  try {
    await connectDB();
    const kdramaList = await KDramaModel.find();

    return NextResponse.json({ message: "Ok", data: kdramaList }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Courses", error },
      { status: 500 }
    );
  }
}

export async function POST( req: any,res: any) {
  try {
    const kdramaData = await req.json();
    await connectDB();
    await KDramaModel.create(kdramaData);

    // const userPost = await postModel.find({ author: user.id }); //// پست های مروبط به کاربر رو پیدا می کنه : کد بک اند

    ////  کاربر رو پیدا می کنه username  , pic id کاربر داخل دیتای پست نشون میده بهت به وسیله populate
    // const posts = await postModel
    //   .find()
    //   .populate("author", ["username", "pic", "_id"])
    //   .sort({ createdAt: -1 });

    return NextResponse.json({ message: "drama has added." }, { status: 201 });
  } catch (error) {
    console.log("error ****", error);
    return NextResponse.json(
      { message: "An error occurred while adding the kdrama." },
      { status: 404 }
    );
  }
}
