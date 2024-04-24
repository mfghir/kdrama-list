import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";

export async function PATCH(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session?.user?.email });

  try {
    const userData = await req.json();
    console.log("userData - update-password *************", userData);
    const hashedPassword = await bcrypt.hash(userData.newPassword, 10);

    await connectDB();
    await User.findOneAndUpdate(
      { email: user.email },
      { password: hashedPassword }
    );

    return NextResponse.json({ message: "Password changed" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while changing the password." },
      { status: 500 }
    );
  }
}
 