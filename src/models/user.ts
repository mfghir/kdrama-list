import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   isActive: boolean;
//   emailToken: string | null;
//   isAdmin: boolean;
//   emailResetPassword: string | null;
//   passwordResetTokenExpires: Date | null; // Field for token expiration
// }

// Define the schema for the PasswordResetToken
interface IPasswordResetToken extends Document {
  token: string;
  createdAt: Date;
  resetAt?: Date;
  user: IUser["_id"];
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, required: true },
  resetAt: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Define the schema for the User
interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  passwordResetTokens: IPasswordResetToken["_id"][];
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
    passwordResetTokens: [
      { type: Schema.Types.ObjectId, ref: "PasswordResetToken" },
    ],

  },
  { timestamps: true }
);

// const User: Model<IUser> =
//   mongoose.models.User || mongoose.model("User", UserSchema);

// export default User;




const PasswordResetTokenSchema = new Schema({
  token: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);
const PasswordResetToken = mongoose.models.passwordResetTokenSchema('PasswordResetToken', PasswordResetTokenSchema);

module.exports = { User, PasswordResetToken };