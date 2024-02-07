// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// import connectDB from "@/lib/connectDB";
// import { NextApiRequest } from "next";
// import { getServerSession } from "next-auth";
// import { Types } from "mongoose";


// interface User {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// interface MyRequest extends NextApiRequest {
//   json(): Promise<User>; // Assuming req.json() returns a User object
// }













// export async function POST(req) {
//   try {
//     await connectDB();
//     const { name, email, password } = await req.json();
//     const session = getServerSession(req);
//     if (!session) {
//       return NextResponse.json(
//         { error: "log in to your account" },
//         { status: 401 }
//       );
//     }

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "not fount the account" },
//         { status: 404 }
//       );
//     }
//     if (!name || !email || !password ) {
//         return NextResponse.json(
//           { error: "plz enter valid data" },
//           { status: 400 }
//         );
//       }

//       const newUSer = await User.create({
//         name,
//         email,
//         password,
//         userId: new Types.ObjectId(user._id),
//       });
//     // await User.create({ name, email, password: hashedPassword });
//     console.log(newUSer);

//     // const hashedPassword = await bcrypt.hash(password, 10);

//     // await User.create({ name, email, password: hashedPassword });

//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }
