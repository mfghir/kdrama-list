import NextAuth from "next-auth/next";
import { authOptions } from "@/auth-options";

// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// import User from "@/models/user";
// import bcrypt from "bcryptjs";
// import connectDB from "@/lib/connectDB";


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




// const handler = NextAuth({
// //  const authOptions :NextAuthOptions  = {
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 24 * 7 /* one week */,
//   },
//   // session: { strategy: "jwt" },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials!;

//         try {
//           await connectDB();
//         } catch (err) {
//           throw new Error("An error occurred on the server");
//         }

//         // if (!email || !password)
//         //   throw new Error("Please provide valid credentials");

//         // const user = await User.findOne({ email });
//         // if (!user) throw new Error("Please create an account first");

//         // const passwordsMatch = await bcrypt.compare(password, user.password);
//         // if (!passwordsMatch) return null;

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
//         //       },

//         // if (passwordsMatch) return { id: user.id, email: user.email };
//         // if (passwordsMatch) return user

//         // return user;
//         // return  {email}
//         // return null;
//       },
//     }),
//   ],

//   // callbacks: {
//   //   async session({session, token, user}) {
//   //     console.log("session ******", session);
//   //     console.log("token *********", token);
//   //     console.log("USER *****", user);
//   //     console.log("Before axios post request");

//   //     try {
//   //       const registerResponse = await axios.post("/api/register",
//   //         {
//   //           name: session?.user?.name,
//   //           email: session?.user?.email,
//   //           image: session?.user?.image,
//   //           // password: session?.user?.password,
//   //         }
//   //       );
//   //       console.log("User registered successfully: ********", registerResponse.data);
//   //     } catch (error) {
//   //       console.error("Error registering user: ********", error);
//   //     }

//   //     return Promise.resolve(session);
//   //   },
//   // },

//   secret: process.env.AUTH_SECRET,
//   pages: {
//     signIn: "/dashboard",
//   },
// }
// );

// // const handler = NextAuth(authOptions);
// // export default authOptions
// export { handler as GET, handler as POST };








const handler = NextAuth(authOptions);

export {handler as GET, handler as POST }