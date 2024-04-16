'use server';

import crypto from 'crypto';
// import { sendEmail } from '../emails/sendEmail';
// import { ResetPasswordEmailTemplate } from '@/app/email-templates/reset-password-email';
import User from '@/models/user';
import { ResetPasswordEmailTemplate } from './reset-password-email';
import { sendEmail } from './sendEmail';

export const resetPassword = async (email: string) => {
    console.log('Resetting password for ' + email);

    const user = await User.findOne({
        email,
    });

    if (!user) {
        throw new Error('User not found');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiry = expiryDate;
    await user.save();

    await sendEmail({
        from: 'Admin <admin@modernwebdevelopment.net>',
        to: [email],
        subject: 'Reset your password',
        react: ResetPasswordEmailTemplate({ email, resetPasswordToken }) as React.ReactElement
    });

    return "Password reset email sent";
};
