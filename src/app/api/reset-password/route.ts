// import bcrypt from "bcryptjs";
// // import { NextRequest, NextResponse } from "next/server";

// import connectDB from "@/lib/connectDB";
// import User from "@/models/user";

// // import { sendPasswordResetEmail } from "@/lib/mail";
// // import { v4 as uuidv4 } from "uuid";

// // import User from "@/models/user";
// // import connectDB from "@/lib/connectDB";

// // export const POST = async (request: NextRequest) => {
// //   await connectDB();

// //   const { email } = await request.json();

// //   const user = await User.findOne({ email });
// //   if (user) {
// //     // Generate a unique token for password reset
// //     const passwordResetToken = uuidv4();

// //     // Set the token to emailResetPassword field in the user document
// //     user.emailResetPassword = passwordResetToken;
// //     await user.save();

// //     // Send the password reset email with the token
// //     await sendPasswordResetEmail(email, passwordResetToken);

// //     return new Response(
// //       JSON.stringify({
// //         message: "A password reset link has been sent to your email.",
// //       }),
// //       { status: 200, headers: { "Content-Type": "application/json" } }
// //     );
// //   } else {
// //     // Respond with a generic message whether or not the email was found
// //     // This is a security measure to prevent email enumeration
// //     return new Response(
// //       JSON.stringify({
// //         message:
// //           "If the email is associated with an account, a password reset link will be sent.",
// //       }),
// //       { status: 200, headers: { "Content-Type": "application/json" } }
// //     );
// //   }
// // };

// export const PUT = async (req: any, res: any) => {
//   try {
//     await connectDB();
//     const { user_id, password } = req.body;
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(400).json({ message: "Account does not exist." });
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     await user.updateOne({
//       password: hashedPassword,
//     });
//     res.status(200).json({ email: user.email });
//     // you should disconnect the db
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };




// import ChangePasswordForm from '@/app/components/ChangePasswordForm';
// import ResetPasswordForm from '@/app/components/ResetPasswordForm';
// import prisma from '@/app/lib/prisma';
// import User from '@/models/user';
// import React from 'react';

// interface ResetPasswordPageProps {
//     searchParams: { [key: string]: string | string[] | undefined };
// }

// const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
//     if (searchParams.token) {
//       try {
//         const user = await User.findOne({
//           resetPasswordToken: searchParams.token as string,
//         });
//         if (!user) {
//           return <div>Invalid token</div>;
//         }
//         return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
//       } catch (error) {
//         console.error('Error finding user:', error);
//         return <div>An error occurred</div>;
//       }
//     } else {
//       return <ResetPasswordForm />;
//     }
//   };
  
//   export default ResetPasswordPage;


