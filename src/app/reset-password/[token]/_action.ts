"use server";

import { PasswordResetToken, User } from "@/models/user";
import { hash } from "bcryptjs";
// import { prisma } from '@/lib/prisma'
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function resetPassword(
  token: string,
  data: FormData,
  res: Response
) {
  const password = data.get("password");
  const confirmPassword = data.get("confirm");

  if (
    !password ||
    typeof password !== "string" ||
    password !== confirmPassword
  ) {
    return NextResponse.json(
      {
        message:
          "The passwords did not match. Please try retyping them and submitting again.",
      },
      { status: 400 }
    );
  }

  try {
    // Find the password reset token
    const passwordResetToken = await PasswordResetToken.findOne({
      token,
      createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
      resetAt: null,
    });

    if (!passwordResetToken) {
      return NextResponse.json(
        {
          message:
            "Invalid token reset request. Please try resetting your password again.",
        },
        { status: 400 }
      );
    }

    // Hash the new password
    const encryptedPassword = await hash(password, 12);

    // Update the user's password
    await User.findByIdAndUpdate(passwordResetToken._id, {
      password: encryptedPassword,
    });

    // Update the password reset token
    await PasswordResetToken.findByIdAndUpdate(passwordResetToken._id, {
      resetAt: new Date(),
    });

    // Redirect to reset password success page
    NextResponse.redirect("/reset-password/success");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      {
        message:
          "An unexpected error occurred. Please try again and if the problem persists, contact support.",
      },
      { status: 500 }
    );
  }
}
