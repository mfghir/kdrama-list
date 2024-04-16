import { sendEmail } from "@/components/test/sendEmail";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import jwt from "jsonwebtoken";



export async function POST(req: any , res:any) {

    try {
        await connectDB();
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Email does not exist." });
        }
       // create token with jwt 
        const user_token =jwt.sign(user._id, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "1h",
    });



     // you should create "pages/reset/[token].js" dynamic page
     const url = `/api/reset-password/${user_id}`;
     // you need to implement sedning email maybe using `nodemailer`
     // create this function for your case
     sendEmail(email, url, "Reset your password.");
     // you should disconnect the db here
     res.json({
       message: "An email has been sent to you to reset your password.",
     });
   } catch (error:unknown) {
     res.status(500).json({ message: error.message });
   }
}