import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import { string } from "zod";
import { NextAuthOptions } from "next-auth";

// // @ts-ignore
// const handler = NextAuth({
//   // export const authOptions = {
//   session: { strategy: "jwt" },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),

//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials,req) {
//         const { email, password } = credentials as never;

//         try {
//           await connectDB();
//         } catch (err) {
//           throw new Error("An error occurred in the server");
//         }

//         try {
//           const user = await User.findOne({ email });
//           if (!user) return null;

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (!passwordsMatch) return null;

//           return user;
//         } catch (error) {
//           console.log("Error during authentication: ", error);
//           return null;
//         }
//       },
//     }),
//   ],

//   secret: process.env.AUTH_SECRET,
//   pages: {
//     signIn: "/dashboard",
//   },
// }
// )

// // @ts-ignore
// // const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST };

// import { handlers } from "auth";

// export const { GET, POST } = handlers

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (err) {
          throw new Error("An error occurred on the server");
        }

        if (!email || !password)
          throw new Error("Please provide valid credentials");

        const user = await User.findOne({ email });
        if (!user) throw new Error("Please create an account first");

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) throw new Error("Incorrect email or password");

        return { email };
      },
    }),

  ],

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/dashboard",
  },
};

const handler = NextAuth(authOptions);

export default handler;
