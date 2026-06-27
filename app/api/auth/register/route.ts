import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import { generateToken } from "@/lib/auth/token";
import { validateEmail } from "@/lib/utils/validators";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: "user",
    });

    await user.save();
    const token = generateToken(user);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
