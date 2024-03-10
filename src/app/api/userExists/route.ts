import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    await connectDB();
    console.log("req api",req);
    const { email } = await req.json();
    const user = await User.findOne({ email })
    const userr = await User.findOne({ email }).select("_id");
    console.log("userr exist ****",userr);
    

    if (!user) {
      // User with the provided email does not exist
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if the user is logged in based on their lastLoggedIn timestamp
    const isLoggedIn = user.lastLoggedIn !== null;
    console.log("isLoggedIn", isLoggedIn);

    if (isLoggedIn) {
      // User is already logged in
      return NextResponse.json(
        { message: "User is already logged in" },
        { status: 200 }
      );
    }

    // // Perform the necessary login operations here
    // // For example, you can update the user's lastLoggedIn field to the current timestamp
    // user.lastLoggedIn = new Date();
    // await user.save();

    // // Return a success message or any other desired response
    // return NextResponse.json(
    //   { message: "User logged in successfully" },
    //   { status: 200 }
    // );

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to checking user", error },
      { status: 500 }
    );
  }
}
