import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";

import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email });
          console.log("user---->", user);

          // const objectId = await User.findOne({ email }).select("_id");
          // const idString = objectId._id.valueOf();
          // console.log("objectId---->",idString); 

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) return null;

          // return user;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            imgUrl: user.imgUrl,
          };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/dashboard",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
