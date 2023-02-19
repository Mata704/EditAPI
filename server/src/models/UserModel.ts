import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export interface UserType extends mongoose.Document {
  email: string;
  password: string;
}

export default mongoose.model<UserType>("User", UserSchema);


