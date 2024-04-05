import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "fatemeghafari77@gmail.com",
    pass: "Mfghir98",
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `http://localhost:3000/activate/${token}`; // Nowy format URL
  await transporter.sendMail({
    from: '"Your App Name" <distories69@gmail.com>',
    to: email,
    subject: "Verify Your Email",
    html: `Please click on the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetPasswordUrl = `http://localhost:3000/reset-password/${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: '"Your App Name" <distories69@gmail.com>',
    to: email,
    subject: "Password Reset Request",
    html: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`,
  });
}

export async function sendNewPasswordEmail(email: string, newPassword: string) {
  await transporter.sendMail({
    from: '"Your App Name" <distories69@gmail.com>',
    to: email,
    subject: "Your New Password",
    html: `Your password has been reset. Here is your new password: <strong>${newPassword}</strong>. It is recommended to change this password after logging in.`,
  });
}