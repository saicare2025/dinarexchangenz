import { connectToDatabase } from "@/utils/mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Schema must match register API
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
}, { collection: "users", timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400 });
    }
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Don't send back password!
    const userInfo = { email: user.email, _id: user._id, name: user.name || "" };

    return new Response(JSON.stringify({ message: "Login successful!", ...userInfo }), { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
