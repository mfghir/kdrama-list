"use server";


import User from '@/models/user';
import bcrypt from 'bcryptjs';

export const changePassword = async (resetPasswordToken: string, password: string) => {
    const user = await User.findOne({
        resetPasswordToken
    });

    if (!user) {
        throw new Error('User not found');
    }

    const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
    if (!resetPasswordTokenExpiry || new Date() > resetPasswordTokenExpiry) {
        throw new Error('Token expired');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await User.updateOne({
        _id: user._id
    }, {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
    });

    return "Password changed successfully";
}
