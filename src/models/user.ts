import mongoose, { Document, Model, models, Schema, model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  passwordResetTokens: IPasswordResetToken["_id"][];
}

interface IPasswordResetToken extends Document {
  token: string;
  createdAt: Date;
  resetAt?: Date;
  user: IUser["_id"];
}

const UserSchema = new Schema(
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
    verifyToken: {
      type: String,
      required: false,
    },
    // passwordResetTokens: [
    //   { type: Schema.Types.ObjectId, ref: "PasswordResetToken" },
    // ],
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || model("User", UserSchema);

export { User };
// export default User;

//
