import EmailTemplate from "@/components/forms/forgot-template";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib";

import ForgotPasswordToken from "@/models/ForgotPasswordToken";
import { User } from "@/models/user";
import connectDB from "@/lib/connectDB";

import { Resend } from "resend";
import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any) {
  try {
    // connect to DB
    await connectDB()
    // .catch((err: any) => NextResponse.json(err));

    // console.log("req forgot*********",req.json())

 
    // const body = await req.json();
    // console.log("body ********",body)

    // const session = await getServerSession(authOptions);
    // console.log("session forgot********",session)
    
    // const user = await User.findOne({ email: session?.user?.email });
    // console.log("user forgot********",user)
    
    const { email } = await req.json()
    console.log("email forgot********",email)
    const user = await User.findOne({ email })
    console.log("user forgot********",user)


    if (!user)
      return NextResponse.json(
        { success: false, error: "User with this email does not exists" },
        { status: 404 }
      );

    // create a reset token
    const resetToken = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(
      /-/g,
      ""
    );

    // save the reset token
    const tokenRes = await ForgotPasswordToken.create({
      userId: user._id,
      token: resetToken,
      resetAt: null,
    });

    // send reset password link in email
    const resetPasswordLink = `${BASE_URL}/reset-password/${tokenRes.token}`;

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [user.email],
      subject: "Forgot Password",

      react: EmailTemplate({ name: user.name, resetLink: resetPasswordLink }),
    });

    console.log("data ******", data);

    return NextResponse.json({
      success: true,
      msg: "Please follow instructions to reset password. If email is not received please check spam folder.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 520 });
  }
}
