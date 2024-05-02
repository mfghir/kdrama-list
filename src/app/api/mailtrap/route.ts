// import { MailtrapClient } from "mailtrap";



// const TOKEN = "5d31785dea64bd3fe1d817c7757477c6";
// const ENDPOINT = "https://send.api.mailtrap.io/";

// const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });



// // biome-ignore lint/suspicious/noExplicitAny: <explanation>
// export default async function POST(req:any, res:any) {
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













import nodemailer from 'nodemailer';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function POST(req:any, res:any) {
  const body = req.body;
  console.log("mailtrap post **********",body)

  const mailData = {
    from: 'test@example.com',
    to: 'test@example.com',
    subject: `New feedback from ${body.name}`,
    text: `${body.feedback}`,
    html: `<p>${body.feedback}</p>`,
  };

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  transport.sendMail(mailData, (error, info) => {
    if (error) console.log(error);
    console.log(`Message sent: ${info}`);
  });

  return res.status(200).json({ body });
}