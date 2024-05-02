"use server";

import User from "@/models/user";
import connectDB from "./connectDB";
import nodemailer from "nodemailer";

// import { MailtrapClient } from "mailtrap";


const TOKEN = "5d31785dea64bd3fe1d817c7757477c6";
const ENDPOINT = "https://send.api.mailtrap.io/";

// const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });




export async function mailAction({ email }: { email: string }) {
  await connectDB();
  const user = await User.findOne({ email });

  if (user) {
    const token = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(
      /-/g,
      ""
    );
    // console.log("token " ,token)

    // const sender = {
    //   email: "mailtrap@kdrama-list.vercel.app",
    //   name: "Mailtrap Test",
    // };
    // const recipients = [
    //   {
    //     email: "fatemeghafari77@gmail.com",
    //   },
    // ];
  


    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "bcbb4c7b70b9f4",
        // pass: "5d31785dea64bd3fe1d817c7757477c6",
        pass: "eec40dcac32688",
        // user: process.env.MAIL_USER,
        // pass: process.env.MAIL_PASS,
      },
    });

    const htmlBody = `Click here to <a  href="http://localhost:3000/reset-password/${token}">Resat password</a> `;
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: htmlBody, // html body
    });
    console.log("Message sent: %s", info.messageId);




    try {
      // const result = await client.send({
      //   from: sender,
      //   to: recipients,
      //   subject: "You are awesome!",
      //   text: "Congrats for sending test email with Mailtrap!",
      //   category: "Integration Test",
      // });
  
      // console.log(result);
    await User.findOneAndUpdate({ email: email }, { verifyToken: token });

      // res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Failed to send email" });
    }



    // save in db
    await User.findOneAndUpdate({ email: email }, { verifyToken: token });
  }

  if (!user) {
    throw new Error("User not found");
  }
}





// export default async function handler(req, res) {
//   const sender = {
//     email: "mailtrap@kdrama-list.vercel.app",
//     name: "Mailtrap Test",
//   };
//   const recipients = [
//     {
//       email: "fatemeghafari77@gmail.com",
//     },
//   ];

//   try {
//     const result = await client.send({
//       from: sender,
//       to: recipients,
//       subject: "You are awesome!",
//       text: "Congrats for sending test email with Mailtrap!",
//       category: "Integration Test",
//     });

//     console.log(result);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// }