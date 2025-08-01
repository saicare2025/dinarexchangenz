import { connectToDatabase } from "@/utils/mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Always use correct DB in connection URI or in the connection code!
// (Assuming your URI in .env already points to Dinar-Exchange)

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { collection: "users", timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400 });
    }

    await connectToDatabase();

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return new Response(JSON.stringify({ message: "User registered!" }), { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
