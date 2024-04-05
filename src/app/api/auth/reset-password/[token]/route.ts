import bcrypt from 'bcryptjs';
import { sendNewPasswordEmail } from '@/lib/mail';
import { randomBytes } from 'crypto';

import connectDB from '@/lib/connectDB';
import User from '@/models/user';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.pathname.split('/').pop();
  await connectDB();
  
  // Find the user by the emailResetPassword token and check if the token has not expired
  const user = await User.findOne({
    emailResetPassword: token,
    $or: [
      { passwordResetTokenExpires: { $gt: new Date() } },
      { passwordResetTokenExpires: null },
    ],
  });
  console.log(`Token: ${token}`);
  console.log(`Current Time: ${new Date()}`);
  console.log(`Token Expiry: ${user?.passwordResetTokenExpires}`);
  console.log(`Current Time Expiry: ${new Date()}`);

  
  if (user) {
    // If the user is found, generate a new secure password
    const newPassword = generateSecurePassword();

    // Hash the new password before saving it to the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token and its expiry
    user.password = hashedPassword;
    user.emailResetPassword = null;
    user.passwordResetTokenExpires = undefined!;
    await user.save();

    // Send the new password to the user's email
    await sendNewPasswordEmail(user.email, newPassword);

    // Return a response indicating the new password has been sent
    return new Response('Your new password has been sent to your email.', {
      status: 200,
    });
  } else {
    // If no user is found or the token is expired, return an error response
    return new Response('Password reset token is invalid or has expired.', {
      status: 400,
    });
  }
}

// Helper function to generate a secure password
function generateSecurePassword() {
  return randomBytes(12).toString('hex'); // Generates a random hex string of length 24
}