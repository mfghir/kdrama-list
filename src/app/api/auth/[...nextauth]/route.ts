import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";

import { AuthOptions, NextAuthOptions } from "next-auth";

export const authOptions = {
  session: { strategy: "jwt"},

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      async authorize(credentials) {

        const { email, password } = credentials as never;
        // console.log("credentials *****", credentials);
        // console.log("credentials csrfToken ********", credentials.csrfToken);
        try {
          await connectDB();
        } catch (err) {
          throw new Error("An error occurred in the server");
        }

        
        if (!email || !password)
          throw new Error("لطفا اطلاعات معتبر وارد کنید");

        const user = await User.findOne({ email });
        if (!user) throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید");

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) throw new Error("ایمیل یا رمز عبور اشتباه است");

        return { email };

        // try {
        //   const user = await User.findOne({ email });
        //   // console.log("user auth---->", user);

        //   // const objectId = await User.findOne({ email }).select("_id");
        //   // const idString = objectId._id.valueOf();
        //   // console.log("objectId ****---->", idString);

        //   if (!user) return null;

        //   const passwordsMatch = await bcrypt.compare(password, user.password);

        //   if (!passwordsMatch) return null;

        //   return user;
        //   // return {
        //   //   id: user.id,
        //   //   name: user.name,
        //   //   email: user.email,
        //   //   role: user.role,
        //   //   imgUrl: user.imgUrl,
        //   // };
        // } catch (error) {
        //   console.log("Error during authentication: ", error);
        //   return null;
        // }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/dashboard",
  },
};

const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
