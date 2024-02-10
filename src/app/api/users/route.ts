// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

import connectDB from "@/lib/connectDB";
import User from "@/models/user";
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












import { NextResponse } from "next/server";

// GET ALL COURSES
export async function GET(request: any) {
  try {
    // Connect to the DB
    await connectDB();
    //get the data using the model
    const courses = await User.find();
    return NextResponse.json(
      {message: "Ok",data: courses}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {message: "Failed to fetch Courses",error},
      {status: 500}
    );
  }
}

//Create a Course
export async function POST(request:any) {
  try {
    //Get the data from the request
    const test= await request.json();
    // const newCourse = {
    //   title,
    //   description,
    // };
    // Connect to the DB
    await connectDB();
    //Use the Model to create
    await User.create(test);
    return NextResponse.json(
      {
        message: "Course created successfully",
        data: test,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Course",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE A COURSE
export async function DELETE(request:any) {
  try {
    //Get the Id of the course
    const id = request.nextUrl.searchParams.get("id");
    //Connect to db
    await connectDB();
    //Use the model to delete
    await User.findByIdAndDelete(id);
    //return the response
    return NextResponse.json(
      {
        message: "Course deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Delete a Course",
        error,
      },
      {
        status: 500,
      }
    );
  }
}













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
