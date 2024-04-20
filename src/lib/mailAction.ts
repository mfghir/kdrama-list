"use server";

import { User } from "@/models/user";
import connectDB from "./connectDB";
import nodemailer from "nodemailer";

export async function mailAction({ email }: { email: string }) {
  await connectDB();
  const user = await User.findOne({ email });
  if (user) {
    // console.log("User Exist " ,user)
    const resetToken = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(
      /-/g,
      ""
    );
    // console.log("resetToken " ,resetToken)

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const htmlBody = `Click here to <a  href="$http://localhost:3000/forget-password/${resetToken}">Resat password </a> `;
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: htmlBody, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

  if (!user) {
    throw new Error("User not found");
  }
}
