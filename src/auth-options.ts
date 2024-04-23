import CredentialsProvider from "next-auth/providers/credentials";
import {
  Account,
  NextAuthOptions,
  Profile,
  RequestInternal,
  Session,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";
import connectDB from "./lib/connectDB";
import { JWT } from "next-auth/jwt";

import User from "./models/user";

type UserModel = any;

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "headers" | "body" | "query" | "method">
      ): Promise<UserModel | null> {
        const { email, password } = credentials!;

        try {
          await connectDB();
        } catch (err) {
          throw new Error("An error occurred on the server");
        }

        // if (!email || !password)
        //   throw new Error("Please provide valid credentials");

        // const user = await User.findOne({ email });
        // if (!user) throw new Error("Please create an account first");

        // const passwordsMatch = await bcrypt.compare(password, user.password);
        // if (!passwordsMatch) return null;

        try {
          const user = await User.findOne({ email });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null;

          return user;
        } catch (error) {
          console.log("Error during authentication: ", error);
          return null;
        }
        //       },

        // if (passwordsMatch) return { id: user.id, email: user.email };
        // if (passwordsMatch) return user

        // return user;
        // return  {email}
        // return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: UserModel | null }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
  // callbacks: {
  //   async session(params: { session: Session; token: JWT; user: User }) {
  //     if (params.session.user) {
  //       params.session.user.email = params.token.email;
  //     }

  //     return params.session;
  //   },
  //   async jwt(params: {
  //     token: JWT;
  //     user?: User | undefined;
  //     account?: Account | null | undefined;
  //     profile?: Profile | undefined;
  //     isNewUser?: boolean | undefined;
  //   }) {
  //     if (params.user) {
  //       params.token.email = params.user.email;
  //     }

  //     return params.token;
  //   },
  // },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/dashboard",
  },
} satisfies NextAuthOptions;

// @ts-ignore
// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST };
