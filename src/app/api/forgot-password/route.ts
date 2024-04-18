// import EmailTemplate from "@/app/components/Email/forgot-template";
// import { BASE_URL } from "@/app/contants";
// import { connectToMongoDB } from "@/app/lib/mongodb";
// import ForgotPasswordToken from "@/app/models/ForgotPasswordToken";

// import {User} from "@/app/models/User";


import EmailTemplate from "@/components/forms/forgot-template";
import { BASE_URL } from "@/lib";
import connectDB from "@/lib/connectDB";
import ForgotPasswordToken from "@/models/ForgotPasswordToken";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        // connect to DB
        connectDB().catch((err:any) => NextResponse.json(err))

        // find the user with email
        const { email } = await req.json()
        const user = await User.findOne({ email })

        if (!user)
            return NextResponse.json({ success: false, error: "User with this email does not exists" }, { status: 404 })

        // create a reset token
        const resetToken = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, '')

        // save the reset token
        const tokenRes = await ForgotPasswordToken.create({
            userId: user._id,
            token: resetToken,
            resetAt: null
        })

        // send reset password link in email
        const resetPasswordLink = `${BASE_URL}/reset-password/${tokenRes.token}`

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [user.email],
            subject: 'Forgot Password',
            // @ts-ignore
            react: EmailTemplate({ name: user.name, resetLink: resetPasswordLink }),
        });

        return NextResponse.json({
            success: true,
            msg: 'Please follow instructions to reset password. If email is not received please check spam folder.'
        })

    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 520 })
    }
}