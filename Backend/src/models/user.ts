import mongoose from "mongoose";

import { hashPassword } from "../utils/auth";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
