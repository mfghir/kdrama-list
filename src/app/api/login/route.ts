import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    await connectDB();
    console.log("req api POST - login ******", req);

    const userData = await req.json();
    console.log("userData - login ******", userData);


    // const { email } = await req.json();
    const user = await User.findOne({ email :userData.email });

    // const userr = await User.findOne({ email }).select("_id");
    // console.log("userr exist ****", userr);

    if (!user) {
      // User with the provided email does not exist
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "User is already logged in" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to checking user", error },
      { status: 500 }
    );
  }
}
