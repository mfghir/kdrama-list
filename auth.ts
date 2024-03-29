// import { CredentialsProvider } from 'next-auth/providers/credentials';
// import NextAuth from "next-auth";
// // import Google from "next-auth/providers/google"
// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";
// import connectDB from '@/lib/connectDB';

// export const config = {
 
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     // CredentialsProvider({

//     // })

//   ],

//   basePath: "/auth",
//   callbacks: {
//     authorized({ request, auth }:any) {
//       const { pathname } = request.nextUrl;
//       if (pathname === "/middleware-example") return !!auth;
//       return true;
//     },
//     jwt({ token, trigger, session }) {
//       if (trigger === "update") token.name = session.user.name;
//       return token;
//     },

//     // async authorize(credentials: any,req: any) {
//     //     const { email, password } = credentials as never;

//     //     try {
//     //       await connectDB();
//     //     } catch (err) {
//     //       throw new Error("An error occurred in the server");
//     //     }

//     //     try {
//     //       const user = await User.findOne({ email });
//     //       if (!user) return null;

//     //       const passwordsMatch = await bcrypt.compare(password, user.password);
//     //       if (!passwordsMatch) return null;

//     //       return user;
//     //     } catch (error) {
//     //       console.log("Error during authentication: ", error);
//     //       return null;
//     //     }
//     //   },


//   },
// } satisfies NextAuthOptions;

// export const { handlers, auth, signIn, signOut } = NextAuth(config);













import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    new CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: { email: string; password: string }) => {
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














