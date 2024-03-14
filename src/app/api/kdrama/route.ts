import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import KDramaModel from "@/models/kdrama";
import { NextApiRequest, NextApiResponse } from "next";


// export async function GET() {
//   try {
//     await connectDB();
//     const kdramaList = await KDramaModel.find();

//     return NextResponse.json({ message: "Ok", data: kdramaList }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch Courses", error },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req:any, res:NextApiResponse) { 
  try {
    const kdramaData = await req.json();
    console.log("kdramaData ********",kdramaData);
    await connectDB();
    await KDramaModel.create(kdramaData);


    // const { id, title, status, label, genre } = req.body;
    // const kdrama = new KDramaModel({ id, title, status, label, genre });
    // const savedKDarama = await kdrama.save();
    // res.status(201).json(savedKDarama);

    // return NextResponse.json({ message: "drama has added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding the kdrama." },
      { status: 500 }
    );
  }
}
