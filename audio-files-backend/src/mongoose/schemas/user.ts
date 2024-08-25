import mongoose, { Schema, Model } from "mongoose";

export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
  isAdmin: boolean;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  displayName: mongoose.Schema.Types.String,
  isAdmin: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
});

export const UserModel: Model<User> = mongoose.model<User, Model<User>>(
  "User",
  UserSchema
);
