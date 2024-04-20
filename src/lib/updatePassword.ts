"use server";
import bcrypt from "bcryptjs";

import { User } from "@/models/user";
import connectDB from "./connectDB";
import { redirect } from "next/navigation";

// interface passTypes {
//   newPassword: string;
//   confirmPassword: string;
// }

export async function updatePassword({
  values,
  token,
}: {
  values: any;
  token: any;
}) {
  console.log("values", values);
  await connectDB();
  const salt = await bcrypt.genSalt(20);
  const hashedPassword = await bcrypt.hash(values.newPassword, salt);
  await User.findOneAndUpdate(
    { verifyToken: token },
    { password: hashedPassword }
  );

  redirect("/login");

  //   if (!user) {
  //     throw new Error("User not found");
  //   }
}
