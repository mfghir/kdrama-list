// import { NextApiRequest, NextApiResponse } from 'next';
// import { ObjectId } from 'mongodb';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PATCH') {
//     try {
//       const { id } = req.query;
//       const { name, email } = req.body; // Assuming you receive these fields

//       // Validate input using Zod
//       const userDTO = UserDTO.convertFromEntity({ name, email });

//       // Update user in MongoDB
//       await userService.updateUser(id, userDTO);

//       res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }

// import connectDB from "@/lib/connectDB";
// import User from "@/models/user";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await connectDB();
//     const { email, ...updatedData } = req.body;
//     const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({ user });
//   } catch (error) {
//     console.log("error ===>", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// import connectDB from "@/lib/connectDB";
// import User from "@/models/user";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await connectDB();
//     const { email, ...updatedData } = req.body;
//     const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({ user });
//   } catch (error) {
//     console.log("error ===>", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }





import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
// import { IncomingMessage } from "http";
// import { NextApiRequest } from "next";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// export async function PATCH(req, context) {
//   try {
//     await connectDB();
//     const id = context.params.userId;
//     console.log("id====>", id);
//     console.log("context====>", context.req);
//     console.log("req====>", req.body);

//     const session = await getServerSession(

//     );
//     console.log("session===>", session);

//     if (session?.user.role === "admin" && Number(id) !== session?.user._id) {
//       return NextResponse.redirect("/");

//     } else if (!Number(id)) {
//       throw new Error("Invalid ID format");
//     }

//     const user = await User.findById(id);
//     if (!user) return NextResponse.redirect("/users");
    
//     const { method, body } = req;

  
//     const updatedUser = await User.findByIdAndUpdate(id, body, { new: true })
//     console.log({ body: JSON.stringify(updatedUser) })
//     return NextResponse.redirect(`/users`);
    
//   } catch (err) {
//     console.log("Error in users api route => ", err);
//     return new Response(JSON.stringify({ status: "error", message: err.message }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


//     const session = await getServerSession(Object.toString(req));
//     console.log("session===>", session);

//     if (!session) {
//       return NextResponse.json(
//         {
//           error:
//             "You are unauthorized to perform this action!, Please login first.",
//         },
//         { status: 401 }
//       );
//     }

//     const user = await User.findOne({ email: session?.user?.email });
//     console.log("object,user", user);

//     if (!user) {
//       return NextResponse.json(
//         { error: "No user found with that email. Please sign up or log in." },
//         { status: 404 }
//       );
//     }

//     if (user.role !== "admin") {
//       return NextResponse.json(
//         { error: "You don't have permission to perform this action" },
//         { status: 403 }
//       );
//     }

//     const userEdited = await User.findOne({ _id: id });
//     console.log("userEdited", userEdited);
//     console.log("req", req);

//     // userEdited.name =req.body.name || user.name,
//     // userEdited.email =req.body.email || user.email,
//     // userEdited.role =req.body.role || user.role,

//     user.set({
//       name: req.body.name || user.name,
//       email: req.body.email || user.email,
//       role: req.body.role || user.role,
//     });

//     userEdited.save();

//     return NextResponse.json(
//       { error: "User updated successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }









export async function GET(request: any, { params: { id } }: any) {
  try {
    // Connect to the DB
    await connectDB();
    //get the data using the model
    const course = await User.findOne({ _id: id });
    return NextResponse.json({message: "Ok",data: course,},{ status: 200 });

  } catch (error) {
    return NextResponse.json(
      {message: "Failed to fetch Courses",error},{status: 500}
    );
  }
}

//Update/EDITING a Course
export async function PUT(request:any, context: any) {
  try {
    console.log("id==",context.params.userId);
    //Get the data from the request 
    const test =await request?.json();
    console.log("test", test);
    
    // const newCourse = { title,description,};
    // Connect to the DB
    await connectDB();
    //Use the Model to update
    await User.findByIdAndUpdate(context.params.userId, test);
    return NextResponse.json(
      {
        message: "Course Updated successfully",
        data: test,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({message: "Failed to Create a Course",error},{status: 500});
  }
}