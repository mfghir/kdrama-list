import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  emailToken: string | null;
  isAdmin: boolean;
  emailResetPassword: string | null;
  passwordResetTokenExpires: Date | null; // Field for token expiration
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    imgUrl: {
      type: String,
      default: "https://i.postimg.cc/rpN1DtvM/uer-pic.jpg",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
  
export default User;
